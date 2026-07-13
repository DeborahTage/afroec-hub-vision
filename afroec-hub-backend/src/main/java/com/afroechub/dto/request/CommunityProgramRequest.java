package com.afroechub.dto.request;

import com.afroechub.enums.Availability;
import com.afroechub.enums.CommunityProgramType;
import com.afroechub.enums.EducationLevel;
import com.afroechub.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * Focused request for a Community program. Maps to a StudentApplication with
 * programType = COMMUNITY.
 */
public record CommunityProgramRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 50) String phone,
        @Size(max = 100) String telegram,
        @NotBlank @Size(max = 100) String city,
        Gender gender,
        EducationLevel educationLevel,
        @NotNull CommunityProgramType communityProgram,
        @NotBlank @Size(max = 5000) String motivation,
        @Size(max = 100) String howDidYouHear,
        Availability availability,
        LocalDate preferredStartDate
) {
}
