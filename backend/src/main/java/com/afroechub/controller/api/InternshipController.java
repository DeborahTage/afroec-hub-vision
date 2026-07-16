package com.afroechub.controller.api;

import com.afroechub.dto.request.InternshipApplicationRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.InternshipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/applications")
@Tag(name = "Internship Applications")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @Operation(summary = "Submit an internship application")
    @PostMapping("/internship")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submit(
            @Valid @RequestBody InternshipApplicationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Internship application submitted", internshipService.submit(request)));
    }
}
