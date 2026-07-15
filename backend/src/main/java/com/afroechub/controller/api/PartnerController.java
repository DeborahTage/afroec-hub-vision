package com.afroechub.controller.api;

import com.afroechub.dto.request.PartnerInquiryRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.StatusLookupResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.PartnerService;
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
@RequestMapping("/api/v1/partners")
@Validated
@Tag(name = "Partners", description = "Partner inquiries")
public class PartnerController {

    private final PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @Operation(summary = "Submit a partner inquiry")
    @PostMapping("/inquire")
    public ResponseEntity<ApiResponse<SubmissionResponse>> inquire(
            @Valid @RequestBody PartnerInquiryRequest request) {
        SubmissionResponse data = partnerService.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Inquiry submitted successfully", data));
    }

    @Operation(summary = "Get partner inquiry status by id + email")
    @GetMapping("/inquire/{id}")
    public ResponseEntity<ApiResponse<StatusLookupResponse>> status(
            @PathVariable Long id,
            @RequestParam @NotBlank @Email String email) {
        StatusLookupResponse data = partnerService.getStatus(id, email);
        return ResponseEntity.ok(ApiResponse.ok("Inquiry found", data));
    }
}
