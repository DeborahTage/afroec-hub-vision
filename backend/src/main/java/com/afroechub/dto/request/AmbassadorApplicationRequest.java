package com.afroechub.dto.request;

import com.afroechub.enums.Gender;
import com.afroechub.enums.InstitutionType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record AmbassadorApplicationRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 50) String phone,
        @NotNull LocalDate dateOfBirth,
        @NotNull Gender gender,
        @NotBlank @Size(max = 100) String city,
        @NotBlank @Size(max = 200) String institutionName,
        @NotNull InstitutionType institutionType,
        @NotBlank @Size(max = 50) String gradeLevel,
        @Size(max = 200) String fieldOfStudy,
        @NotBlank @Size(max = 5000) String motivationLetter,
        @Size(max = 3000) String leadershipExperience,
        List<String> techSkills,
        @NotNull Integer hoursPerWeek,
        @NotBlank @Size(max = 200) String proposedClubName,
        @NotNull Integer estimatedMembers,
        List<String> supportNeeded,
        @Size(max = 500) String cvUrl,
        @Size(max = 500) String recommendationLetterUrl,
        @Size(max = 500) String portfolioUrl,
        @NotNull Boolean commitHours,
        @NotNull Boolean commitClub,
        @NotNull Boolean commitBootcamp,
        @NotNull Boolean agreeConduct
) {}
