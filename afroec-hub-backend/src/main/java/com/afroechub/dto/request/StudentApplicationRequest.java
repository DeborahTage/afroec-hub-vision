package com.afroechub.dto.request;

import com.afroechub.enums.AcademyTrack;
import com.afroechub.enums.Availability;
import com.afroechub.enums.CommunityProgramType;
import com.afroechub.enums.EducationLevel;
import com.afroechub.enums.EmploymentStatus;
import com.afroechub.enums.Gender;
import com.afroechub.enums.ProgramType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record StudentApplicationRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 50) String phone,
        @Size(max = 100) String telegram,
        @NotBlank @Size(max = 100) String city,
        @Past LocalDate dateOfBirth,
        Gender gender,
        EducationLevel educationLevel,
        EmploymentStatus employmentStatus,
        @NotNull ProgramType programType,
        AcademyTrack academyTrack,
        CommunityProgramType communityProgram,
        @Size(max = 5000) String priorExperience,
        @NotBlank @Size(max = 5000) String motivation,
        @Size(max = 5000) String careerGoals,
        @Size(max = 500) String githubPortfolio,
        Boolean incomeShareAgreement,
        @Size(max = 100) String howDidYouHear,
        Availability availability,
        LocalDate preferredStartDate,
        Boolean canCommitFulltime
) {
}
