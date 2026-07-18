package com.afroechub.service;

import com.afroechub.dto.response.DocumentUploadResponse;
import com.afroechub.entity.ApplicationDocument;
import com.afroechub.exception.InvalidRequestException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.ApplicationDocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Service
public class ApplicationDocumentService {

    private static final long MAX_FILE_SIZE = 5L * 1024 * 1024;
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("pdf", "doc", "docx");

    private final ApplicationDocumentRepository repository;

    public ApplicationDocumentService(ApplicationDocumentRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public DocumentUploadResponse uploadCv(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidRequestException("Please select a CV document.");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidRequestException("CV document must be 5 MB or smaller.");
        }

        String filename = safeFilename(file.getOriginalFilename());
        String extension = extensionOf(filename);
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new InvalidRequestException("CV document must be a PDF, DOC, or DOCX file.");
        }

        byte[] content;
        try {
            content = file.getBytes();
        } catch (IOException ex) {
            throw new InvalidRequestException("Unable to read the uploaded CV document.");
        }
        if (!hasExpectedSignature(extension, content)) {
            throw new InvalidRequestException("The uploaded file content does not match its document type.");
        }

        ApplicationDocument document = new ApplicationDocument();
        document.setToken(UUID.randomUUID().toString());
        document.setOriginalFilename(filename);
        document.setContentType(contentTypeFor(extension));
        document.setFileSize(content.length);
        document.setContent(content);
        repository.save(document);

        return new DocumentUploadResponse(
                "/api/v1/documents/" + document.getToken(),
                document.getOriginalFilename());
    }

    @Transactional(readOnly = true)
    public ApplicationDocument get(String token) {
        return repository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
    }

    private String safeFilename(String originalFilename) {
        String filename = originalFilename == null ? "cv" : originalFilename;
        filename = filename.replace("\\", "/");
        filename = filename.substring(filename.lastIndexOf('/') + 1)
                .replaceAll("[\\r\\n\"]", "_");
        if (filename.isBlank() || filename.length() > 255) {
            throw new InvalidRequestException("CV filename is invalid or too long.");
        }
        return filename;
    }

    private String extensionOf(String filename) {
        int dot = filename.lastIndexOf('.');
        return dot < 0 ? "" : filename.substring(dot + 1).toLowerCase(Locale.ROOT);
    }

    private boolean hasExpectedSignature(String extension, byte[] content) {
        if ("pdf".equals(extension)) {
            return startsWith(content, new int[]{0x25, 0x50, 0x44, 0x46, 0x2D});
        }
        if ("doc".equals(extension)) {
            return startsWith(content, new int[]{0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1});
        }
        return startsWith(content, new int[]{0x50, 0x4B, 0x03, 0x04});
    }

    private boolean startsWith(byte[] content, int[] signature) {
        if (content.length < signature.length) {
            return false;
        }
        for (int i = 0; i < signature.length; i++) {
            if ((content[i] & 0xFF) != signature[i]) {
                return false;
            }
        }
        return true;
    }

    private String contentTypeFor(String extension) {
        return switch (extension) {
            case "pdf" -> "application/pdf";
            case "doc" -> "application/msword";
            case "docx" -> "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            default -> "application/octet-stream";
        };
    }
}
