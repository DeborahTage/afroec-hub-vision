package com.afroechub.dto.request;

import com.afroechub.enums.Availability;
import com.afroechub.enums.CommitmentDuration;
import com.afroechub.enums.ExperienceLevel;
import com.afroechub.enums.VolunteerRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record VolunteerApplicationRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 50) String phone,
        @Size(max = 100) String telegram,
        @NotBlank @Size(max = 100) String city,
        @NotNull VolunteerRole primaryRole,
        VolunteerRole secondaryRole,
        @NotNull Availability availability,
        @Min(0) Integer hoursPerWeek,
        LocalDate startDate,
        CommitmentDuration commitmentDuration,
        @NotBlank @Size(max = 5000) String professionalBackground,
        @NotBlank @Size(max = 5000) String motivation,
        List<String> skills,
        List<String> languages,
        ExperienceLevel experienceLevel,
        @Size(max = 500) String portfolioLink,
        @Size(max = 500) String resumeLink,
        @Size(max = 1000) String referencesContact
) {
}
