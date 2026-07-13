package com.afroechub.dto.response;

import java.time.LocalDateTime;

/**
 * Minimal public status payload — never includes PII beyond what the caller
 * already supplied (id / email). Mitigates IDOR / mass enumeration (OWASP A01).
 */
public record StatusLookupResponse(
        Long id,
        String referenceId,
        String status,
        LocalDateTime submittedAt
) {
}
