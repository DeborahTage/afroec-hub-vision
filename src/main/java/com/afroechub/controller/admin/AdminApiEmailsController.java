package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.repository.ContactSubmissionRepository;
import com.afroechub.repository.NewsletterSubscriberRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminApiEmailsController {
    private final ContactSubmissionRepository contacts;
    private final NewsletterSubscriberRepository subscribers;
    public AdminApiEmailsController(ContactSubmissionRepository contacts, NewsletterSubscriberRepository subscribers) { this.contacts = contacts; this.subscribers = subscribers; }
    @GetMapping("/emails/contacts") public ResponseEntity<ApiResponse<Object>> contacts() { return ResponseEntity.ok(ApiResponse.ok("OK", contacts.findAll(Sort.by(Sort.Direction.DESC, "createdAt")))); }
    @GetMapping("/newsletter/subscribers") public ResponseEntity<ApiResponse<Object>> subscribers() { return ResponseEntity.ok(ApiResponse.ok("OK", subscribers.findAll(Sort.by(Sort.Direction.DESC, "subscribedAt")))); }
}
