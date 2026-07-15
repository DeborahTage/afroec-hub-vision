package com.afroechub.service.impl;

import com.afroechub.dto.request.ContactFormRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.ContactSubmission;
import com.afroechub.enums.ContactStatus;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.ContactSubmissionRepository;
import com.afroechub.service.ContactService;
import com.afroechub.service.EmailService;
import com.afroechub.util.ValidationUtil;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ContactServiceImpl implements ContactService {

    private static final String NEXT_STEPS =
            "Thank you for contacting Afroec Hub. We'll get back to you soon.";

    private final ContactSubmissionRepository repository;
    private final EmailService emailService;

    public ContactServiceImpl(ContactSubmissionRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public SubmissionResponse submit(ContactFormRequest r) {
        ContactSubmission c = new ContactSubmission();
        c.setName(ValidationUtil.sanitize(r.name()));
        c.setEmail(r.email().trim().toLowerCase());
        c.setPhone(ValidationUtil.sanitizeNullable(r.phone()));
        c.setSubject(r.subject());
        c.setMessage(ValidationUtil.sanitize(r.message()));
        c.setStatus(ContactStatus.NEW);
        ContactSubmission saved = repository.save(c);

        emailService.sendTemplated(saved.getEmail(),
                "Afroec Hub — We received your message",
                "application-confirmation",
                Map.of("fullName", saved.getName(), "applicationId", "CONTACT-" + saved.getId()));

        return new SubmissionResponse(saved.getId(), null,
                saved.getStatus().name(), saved.getCreatedAt(), NEXT_STEPS);
    }

    @Transactional(readOnly = true)
    @Override
    public ContactSubmission findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact submission", id));
    }

    @Transactional(readOnly = true)
    @Override
    public Page<ContactSubmission> search(String query, ContactStatus status, Pageable pageable) {
        Specification<ContactSubmission> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("email")), like)));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(spec, pageable);
    }

    @Transactional
    @Override
    public ContactSubmission reply(Long id, String responseText) {
        ContactSubmission c = findById(id);
        c.setResponseText(ValidationUtil.sanitize(responseText));
        c.setResponded(true);
        c.setRespondedAt(LocalDateTime.now());
        c.setStatus(ContactStatus.RESOLVED);
        ContactSubmission saved = repository.save(c);
        emailService.sendTemplated(saved.getEmail(),
                "Afroec Hub — Response to your inquiry",
                "application-confirmation",
                Map.of("fullName", saved.getName(), "applicationId", responseText));
        return saved;
    }

    @Transactional
    @Override
    public ContactSubmission updateStatus(Long id, ContactStatus status) {
        ContactSubmission c = findById(id);
        if (status != null) {
            c.setStatus(status);
        }
        return repository.save(c);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Contact submission", id);
        }
        repository.deleteById(id);
    }
}
