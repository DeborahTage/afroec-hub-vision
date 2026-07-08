package com.afroechub.dto.request;

import com.afroechub.enums.ContactSubject;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ContactFormRequest(
        @NotBlank @Size(max = 200) String name,
        @NotBlank @Email @Size(max = 200) String email,
        @Size(max = 50) String phone,
        @NotNull ContactSubject subject,
        @NotBlank String message
) {
}
