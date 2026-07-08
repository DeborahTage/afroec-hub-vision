package com.afroechub.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewsletterSubscriptionRequest(
        @NotBlank @Email @Size(max = 200) String email
) {
}
