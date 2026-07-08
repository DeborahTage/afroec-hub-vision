package com.afroechub.dto.request;

import com.afroechub.enums.AcademyTrack;
import com.afroechub.enums.Availability;
import com.afroechub.enums.EducationLevel;
import com.afroechub.enums.EmploymentStatus;
import com.afroechub.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * Focused request for the Academy track. Maps to a StudentApplication with
 * programType = ACADEMY.
 */
public record AcademyApplicationRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 50) String phone,
        @Size(max = 100) String telegram,
        @NotBlank @Size(max = 100) String city,
        @Past LocalDate dateOfBirth,
        Gender gender,
        EducationLevel educationLevel,
        EmploymentStatus employmentStatus,
        @NotNull AcademyTrack academyTrack,
        String priorExperience,
        @NotBlank String motivation,
        String careerGoals,
        @Size(max = 500) String githubPortfolio,
        Boolean incomeShareAgreement,
        @Size(max = 100) String howDidYouHear,
        Availability availability,
        LocalDate preferredStartDate,
        Boolean canCommitFulltime
) {
}
