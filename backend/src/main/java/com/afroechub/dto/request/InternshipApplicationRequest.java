package com.afroechub.dto.request;

import com.afroechub.enums.InternshipDepartment;
import com.afroechub.enums.InternshipDuration;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record InternshipApplicationRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 50) String phone,
        @Size(max = 500) String linkedinUrl,
        @NotBlank @Size(max = 200) String institution,
        @NotBlank @Size(max = 200) String fieldOfStudy,
        @NotBlank @Size(max = 50) String yearOfStudy,
        @NotNull LocalDate graduationDate,
        @NotNull InternshipDepartment department,
        @NotNull InternshipDuration duration,
        @NotNull LocalDate startDate,
        @NotNull Boolean fullTime,
        List<String> skills,
        @Size(max = 5000) String experience,
        @Size(max = 2000) String projectLinks,
        @Size(max = 500) String githubUrl,
        @NotBlank @Size(max = 3000) String motivationAfroec,
        @NotBlank @Size(max = 2000) String learningGoals,
        @NotBlank @Size(max = 500) String cvUrl,
        @Size(max = 500) String coverLetterUrl,
        @Size(max = 500) String transcriptUrl,
        @NotNull Boolean agreeUnpaid,
        @NotNull Boolean agreeDuration,
        @NotNull Boolean agreePolicies
) {}
