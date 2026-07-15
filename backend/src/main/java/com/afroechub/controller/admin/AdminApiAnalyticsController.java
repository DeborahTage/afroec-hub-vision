package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/analytics")
public class AdminApiAnalyticsController {
    private final AnalyticsService analyticsService;
    public AdminApiAnalyticsController(AnalyticsService analyticsService) { this.analyticsService = analyticsService; }
    @GetMapping("/overview") public ResponseEntity<ApiResponse<Map<String, Object>>> overview() { return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview())); }
    @GetMapping("/pages") public ResponseEntity<ApiResponse<Object>> pages() { return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview().get("popularPages"))); }
    @GetMapping("/sources") public ResponseEntity<ApiResponse<Object>> sources() { return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview().get("trafficSources"))); }
    @GetMapping("/geo") public ResponseEntity<ApiResponse<Object>> geo() { return ResponseEntity.ok(ApiResponse.ok("OK", analyticsService.overview().get("geo"))); }
}
