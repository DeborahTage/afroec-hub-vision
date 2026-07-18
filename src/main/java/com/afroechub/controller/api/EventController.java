package com.afroechub.controller.api;

import com.afroechub.dto.request.EventRegistrationRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.Event;
import com.afroechub.enums.EventStatus;
import com.afroechub.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@Tag(name = "Events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @Operation(summary = "List published events")
    public ResponseEntity<ApiResponse<List<Event>>> list(
            @RequestParam(required = false) EventStatus status,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(ApiResponse.ok("OK", eventService.listPublished(status, category)));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get published event by slug")
    public ResponseEntity<ApiResponse<Event>> get(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok("OK", eventService.getPublishedBySlug(slug)));
    }

    @PostMapping("/{id}/register")
    @Operation(summary = "Register for an event")
    public ResponseEntity<ApiResponse<SubmissionResponse>> register(
            @PathVariable Long id,
            @Valid @RequestBody EventRegistrationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Registered", eventService.register(id, request)));
    }
}
