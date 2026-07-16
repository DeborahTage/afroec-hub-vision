package com.afroechub.controller.api;

import com.afroechub.dto.request.AnalyticsTrackRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.service.AnalyticsService;
import com.afroechub.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
@Tag(name = "Analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/track")
    @Operation(summary = "Track a page view")
    public ResponseEntity<ApiResponse<Void>> track(
            @Valid @RequestBody AnalyticsTrackRequest request,
            HttpServletRequest httpRequest) {
        analyticsService.track(request, JwtUtil.clientIp(httpRequest));
        return ResponseEntity.ok(ApiResponse.ok("Tracked"));
    }
}
