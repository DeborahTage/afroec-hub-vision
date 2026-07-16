package com.afroechub.dto.response;

import com.afroechub.entity.ContactSubmission;

import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String name,
        String email,
        String phone,
        String subject,
        String message,
        String status,
        Boolean responded,
        String responseText,
        LocalDateTime respondedAt,
        LocalDateTime createdAt
) {
    public static ContactResponse from(ContactSubmission c) {
        return new ContactResponse(
                c.getId(),
                c.getName(),
                c.getEmail(),
                c.getPhone(),
                c.getSubject() != null ? c.getSubject().name() : null,
                c.getMessage(),
                c.getStatus() != null ? c.getStatus().name() : null,
                c.getResponded(),
                c.getResponseText(),
                c.getRespondedAt(),
                c.getCreatedAt()
        );
    }
}
