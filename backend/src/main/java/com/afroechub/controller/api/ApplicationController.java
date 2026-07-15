package com.afroechub.controller.api;

import com.afroechub.dto.request.AcademyApplicationRequest;
import com.afroechub.dto.request.CommunityProgramRequest;
import com.afroechub.dto.request.ProductHubApplicationRequest;
import com.afroechub.dto.request.StudentApplicationRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.StatusLookupResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.ApplicationService;
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
@RequestMapping("/api/v1/applications")
@Validated
@Tag(name = "Applications", description = "Student / Academy / Product Hub / Community applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @Operation(summary = "Submit a student application")
    @PostMapping("/student")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitStudent(
            @Valid @RequestBody StudentApplicationRequest request) {
        SubmissionResponse data = applicationService.submitStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application submitted successfully", data));
    }

    @Operation(summary = "Submit an Academy application")
    @PostMapping("/academy")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitAcademy(
            @Valid @RequestBody AcademyApplicationRequest request) {
        SubmissionResponse data = applicationService.submitAcademy(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application submitted successfully", data));
    }

    @Operation(summary = "Submit a Product Hub application")
    @PostMapping("/product-hub")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitProductHub(
            @Valid @RequestBody ProductHubApplicationRequest request) {
        SubmissionResponse data = applicationService.submitProductHub(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application submitted successfully", data));
    }

    @Operation(summary = "Submit a Community program application")
    @PostMapping("/community")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitCommunity(
            @Valid @RequestBody CommunityProgramRequest request) {
        SubmissionResponse data = applicationService.submitCommunity(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application submitted successfully", data));
    }

    @Operation(summary = "Get application status by id + email (minimal fields only)")
    @GetMapping("/student/{id}")
    public ResponseEntity<ApiResponse<StatusLookupResponse>> getStatus(
            @PathVariable Long id,
            @RequestParam @NotBlank @Email String email) {
        StatusLookupResponse data = applicationService.getStatus(id, email);
        return ResponseEntity.ok(ApiResponse.ok("Application found", data));
    }
}
