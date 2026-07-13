package com.afroechub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewsletterUnsubscribeRequest(
        @NotBlank @Size(max = 100) String token
) {
}
