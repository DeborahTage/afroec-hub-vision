package com.afroechub.controller.api;

import com.afroechub.dto.request.PartnerInquiryRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.PartnerResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.PartnerService;
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
@RequestMapping("/api/v1/partners")
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

    @Operation(summary = "Get partner inquiry status")
    @GetMapping("/inquire/{id}")
    public ResponseEntity<ApiResponse<PartnerResponse>> status(@PathVariable Long id) {
        PartnerResponse data = PartnerResponse.from(partnerService.getStatus(id));
        return ResponseEntity.ok(ApiResponse.ok("Inquiry found", data));
    }
}
