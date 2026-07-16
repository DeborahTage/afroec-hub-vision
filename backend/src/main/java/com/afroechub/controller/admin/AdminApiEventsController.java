package com.afroechub.controller.admin;

import com.afroechub.dto.request.EventUpsertRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.Event;
import com.afroechub.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/events")
public class AdminApiEventsController {
    private final EventService eventService;
    public AdminApiEventsController(EventService eventService) { this.eventService = eventService; }
    @GetMapping public ResponseEntity<ApiResponse<List<Event>>> list() { return ResponseEntity.ok(ApiResponse.ok("OK", eventService.listAll())); }
    @PostMapping public ResponseEntity<ApiResponse<Event>> create(@Valid @RequestBody EventUpsertRequest request) { return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Created", eventService.create(request))); }
    @PutMapping("/{id}") public ResponseEntity<ApiResponse<Event>> update(@PathVariable Long id, @Valid @RequestBody EventUpsertRequest request) { return ResponseEntity.ok(ApiResponse.ok("Updated", eventService.update(id, request))); }
    @DeleteMapping("/{id}") public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) { eventService.delete(id); return ResponseEntity.ok(ApiResponse.ok("Deleted")); }
}
