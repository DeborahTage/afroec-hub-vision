package com.afroechub.controller.api;

import com.afroechub.dto.request.VolunteerApplicationRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.dto.response.VolunteerResponse;
import com.afroechub.service.VolunteerService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/volunteers")
@Tag(name = "Volunteers", description = "Volunteer applications")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @Operation(summary = "Submit a volunteer application")
    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<SubmissionResponse>> apply(
            @Valid @RequestBody VolunteerApplicationRequest request) {
        SubmissionResponse data = volunteerService.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application submitted successfully", data));
    }

    @Operation(summary = "Get volunteer application status")
    @GetMapping("/apply/{id}")
    public ResponseEntity<ApiResponse<VolunteerResponse>> status(@PathVariable Long id) {
        VolunteerResponse data = VolunteerResponse.from(volunteerService.getStatus(id));
        return ResponseEntity.ok(ApiResponse.ok("Application found", data));
    }
}
