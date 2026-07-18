package com.afroechub.controller.api;

import com.afroechub.dto.request.AmbassadorApplicationRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.AmbassadorService;
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
@Tag(name = "Ambassador Applications")
public class AmbassadorController {

    private final AmbassadorService ambassadorService;

    public AmbassadorController(AmbassadorService ambassadorService) {
        this.ambassadorService = ambassadorService;
    }

    @Operation(summary = "Submit a Founding Ambassador application")
    @PostMapping("/ambassador")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submit(
            @Valid @RequestBody AmbassadorApplicationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Ambassador application submitted", ambassadorService.submit(request)));
    }
}
