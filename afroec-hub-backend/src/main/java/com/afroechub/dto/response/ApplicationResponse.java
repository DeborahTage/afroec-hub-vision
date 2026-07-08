package com.afroechub.dto.response;

import com.afroechub.entity.StudentApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ApplicationResponse(
        Long id,
        String applicationId,
        String fullName,
        String email,
        String phone,
        String telegram,
        String city,
        LocalDate dateOfBirth,
        String gender,
        String educationLevel,
        String employmentStatus,
        String programType,
        String academyTrack,
        String communityProgram,
        String priorExperience,
        String motivation,
        String careerGoals,
        String githubPortfolio,
        Boolean incomeShareAgreement,
        String howDidYouHear,
        String availability,
        LocalDate preferredStartDate,
        Boolean canCommitFulltime,
        String status,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ApplicationResponse from(StudentApplication s) {
        return new ApplicationResponse(
                s.getId(),
                formatApplicationId(s.getId(), s.getCreatedAt()),
                s.getFullName(),
                s.getEmail(),
                s.getPhone(),
                s.getTelegram(),
                s.getCity(),
                s.getDateOfBirth(),
                s.getGender() != null ? s.getGender().name() : null,
                s.getEducationLevel() != null ? s.getEducationLevel().name() : null,
                s.getEmploymentStatus() != null ? s.getEmploymentStatus().name() : null,
                s.getProgramType() != null ? s.getProgramType().name() : null,
                s.getAcademyTrack() != null ? s.getAcademyTrack().name() : null,
                s.getCommunityProgram() != null ? s.getCommunityProgram().name() : null,
                s.getPriorExperience(),
                s.getMotivation(),
                s.getCareerGoals(),
                s.getGithubPortfolio(),
                s.getIncomeShareAgreement(),
                s.getHowDidYouHear(),
                s.getAvailability() != null ? s.getAvailability().name() : null,
                s.getPreferredStartDate(),
                s.getCanCommitFulltime(),
                s.getStatus() != null ? s.getStatus().name() : null,
                s.getNotes(),
                s.getCreatedAt(),
                s.getUpdatedAt()
        );
    }

    public static String formatApplicationId(Long id, LocalDateTime createdAt) {
        int year = createdAt != null ? createdAt.getYear() : java.time.Year.now().getValue();
        return String.format("AFH-%d-%05d", year, id);
    }
}
