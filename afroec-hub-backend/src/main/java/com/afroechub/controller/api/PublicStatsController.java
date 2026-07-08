package com.afroechub.controller.api;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.StatsResponse;
import com.afroechub.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stats")
@Tag(name = "Stats", description = "Public statistics")
public class PublicStatsController {

    private final StatsService statsService;

    public PublicStatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @Operation(summary = "Get public stats for the website")
    @GetMapping("/public")
    public ResponseEntity<ApiResponse<StatsResponse>> publicStats() {
        return ResponseEntity.ok(ApiResponse.ok("OK", statsService.publicStats()));
    }
}
