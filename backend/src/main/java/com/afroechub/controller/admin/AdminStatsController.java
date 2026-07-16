package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.DashboardStatsResponse;
import com.afroechub.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * JSON stats consumed by the dashboard charts (fetched client-side).
 */
@RestController
@RequestMapping("/admin/api/stats")
public class AdminStatsController {

    private final StatsService statsService;

    public AdminStatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> stats() {
        return ResponseEntity.ok(ApiResponse.ok("OK", statsService.dashboardStats()));
    }
}
