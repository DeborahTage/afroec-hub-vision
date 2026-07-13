package com.afroechub.controller.api;

import com.afroechub.dto.request.VolunteerApplicationRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.StatusLookupResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.VolunteerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/volunteers")
@Validated
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

    @Operation(summary = "Get volunteer application status by id + email")
    @GetMapping("/apply/{id}")
    public ResponseEntity<ApiResponse<StatusLookupResponse>> status(
            @PathVariable Long id,
            @RequestParam @NotBlank @Email String email) {
        StatusLookupResponse data = volunteerService.getStatus(id, email);
        return ResponseEntity.ok(ApiResponse.ok("Application found", data));
    }
}
