package com.afroechub.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EventRegistrationRequest(
        @NotBlank @Size(max = 200) String fullName,
        @NotBlank @Email @Size(max = 200) String email,
        @Size(max = 50) String phone,
        @Size(max = 200) String institution,
        @Size(max = 1000) String dietaryRequirements
) {}
