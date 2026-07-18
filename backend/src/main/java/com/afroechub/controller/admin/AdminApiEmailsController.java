package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.ContactSubmission;
import com.afroechub.enums.ContactStatus;
import com.afroechub.exception.InvalidRequestException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.ContactSubmissionRepository;
import com.afroechub.repository.NewsletterSubscriberRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminApiEmailsController {
    private final ContactSubmissionRepository contacts;
    private final NewsletterSubscriberRepository subscribers;

    public AdminApiEmailsController(ContactSubmissionRepository contacts,
                                    NewsletterSubscriberRepository subscribers) {
        this.contacts = contacts;
        this.subscribers = subscribers;
    }

    @GetMapping("/emails/contacts")
    public ResponseEntity<ApiResponse<Object>> contacts() {
        return ResponseEntity.ok(ApiResponse.ok("OK",
                contacts.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))));
    }

    @PutMapping("/emails/contacts/{id}/status")
    public ResponseEntity<ApiResponse<ContactSubmission>> updateContactStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String status = body == null ? null : body.get("status");
        if (status == null || status.isBlank()) {
            throw new InvalidRequestException("Status is required.");
        }
        ContactSubmission contact = contacts.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found"));
        try {
            contact.setStatus(ContactStatus.valueOf(status.trim().toUpperCase(Locale.ROOT)));
        } catch (Exception ex) {
            throw new InvalidRequestException("Invalid contact status.");
        }
        return ResponseEntity.ok(ApiResponse.ok("Status updated", contacts.save(contact)));
    }

    @GetMapping("/newsletter/subscribers")
    public ResponseEntity<ApiResponse<Object>> subscribers() {
        return ResponseEntity.ok(ApiResponse.ok("OK",
                subscribers.findAll(Sort.by(Sort.Direction.DESC, "subscribedAt"))));
    }
}
