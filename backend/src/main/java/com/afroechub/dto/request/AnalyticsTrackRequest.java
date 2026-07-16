package com.afroechub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AnalyticsTrackRequest(
        @NotBlank @Size(max = 500) String pageUrl,
        @Size(max = 500) String referrer,
        @Size(max = 1000) String userAgent,
        Integer screenWidth,
        Integer screenHeight,
        @Size(max = 20) String language,
        @Size(max = 100) String sessionId
) {}
