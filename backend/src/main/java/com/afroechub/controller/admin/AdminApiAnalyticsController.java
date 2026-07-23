package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/analytics")
public class AdminApiAnalyticsController {
    private final AnalyticsService analyticsService;

    public AdminApiAnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<Map<String, Object>>> overview(
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview(days)));
    }

    @GetMapping("/daily")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> daily(
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.daily(days)));
    }

    @GetMapping("/pages")
    public ResponseEntity<ApiResponse<Object>> pages(@RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview(days).get("popularPages")));
    }

    @GetMapping("/sources")
    public ResponseEntity<ApiResponse<Object>> sources(@RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview(days).get("trafficSources")));
    }

    @GetMapping("/geo")
    public ResponseEntity<ApiResponse<Object>> geo(@RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview(days).get("geo")));
    }

    @GetMapping("/devices")
    public ResponseEntity<ApiResponse<Object>> devices(@RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview(days).get("devices")));
    }
}
