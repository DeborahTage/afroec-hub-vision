package com.afroechub.controller.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health", description = "Service health")
public class HealthController {

    @Operation(summary = "Health check")
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        String envBuild = System.getenv().getOrDefault("APP_BUILD_ID", "");
        String buildId = envBuild.isBlank() ? "20260723-analytics-daily-v1" : envBuild;
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "afroec-hub-backend",
                "build", buildId,
                "timestamp", Instant.now().toString()
        ));
    }
}
