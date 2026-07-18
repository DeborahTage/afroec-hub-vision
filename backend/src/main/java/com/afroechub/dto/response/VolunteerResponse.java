package com.afroechub.dto.response;

import com.afroechub.entity.VolunteerApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record VolunteerResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        String telegram,
        String city,
        String primaryRole,
        String secondaryRole,
        String availability,
        Integer hoursPerWeek,
        LocalDate startDate,
        String commitmentDuration,
        String professionalBackground,
        String motivation,
        List<String> skills,
        List<String> languages,
        String experienceLevel,
        String portfolioLink,
        String resumeLink,
        String referencesContact,
        String status,
        Boolean onboarded,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static VolunteerResponse from(VolunteerApplication v) {
        return new VolunteerResponse(
                v.getId(),
                v.getFullName(),
                v.getEmail(),
                v.getPhone(),
                v.getTelegram(),
                v.getCity(),
                v.getPrimaryRole() != null ? v.getPrimaryRole().name() : null,
                v.getSecondaryRole() != null ? v.getSecondaryRole().name() : null,
                v.getAvailability() != null ? v.getAvailability().name() : null,
                v.getHoursPerWeek(),
                v.getStartDate(),
                v.getCommitmentDuration() != null ? v.getCommitmentDuration().name() : null,
                v.getProfessionalBackground(),
                v.getMotivation(),
                v.getSkills(),
                v.getLanguages(),
                v.getExperienceLevel() != null ? v.getExperienceLevel().name() : null,
                v.getPortfolioLink(),
                v.getResumeLink(),
                v.getReferencesContact(),
                v.getStatus() != null ? v.getStatus().name() : null,
                v.getOnboarded(),
                v.getNotes(),
                v.getCreatedAt(),
                v.getUpdatedAt()
        );
    }
}
