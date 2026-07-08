package com.afroechub.dto.response;

import java.time.LocalDateTime;

/**
 * Lightweight response returned right after a public submission is created.
 */
public record SubmissionResponse(
        Long id,
        String applicationId,
        String status,
        LocalDateTime submittedAt,
        String nextSteps
) {
}
