package com.afroechub.dto.response;

import com.afroechub.entity.PartnerInquiry;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record PartnerResponse(
        Long id,
        String organizationName,
        String contactPerson,
        String email,
        String phone,
        String organizationType,
        List<String> partnershipInterest,
        String message,
        String status,
        String assignedTo,
        LocalDate followUpDate,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static PartnerResponse from(PartnerInquiry p) {
        return new PartnerResponse(
                p.getId(),
                p.getOrganizationName(),
                p.getContactPerson(),
                p.getEmail(),
                p.getPhone(),
                p.getOrganizationType() != null ? p.getOrganizationType().name() : null,
                p.getPartnershipInterest(),
                p.getMessage(),
                p.getStatus() != null ? p.getStatus().name() : null,
                p.getAssignedTo(),
                p.getFollowUpDate(),
                p.getNotes(),
                p.getCreatedAt(),
                p.getUpdatedAt()
        );
    }
}
