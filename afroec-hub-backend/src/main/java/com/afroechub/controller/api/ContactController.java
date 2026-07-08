package com.afroechub.controller.api;

import com.afroechub.dto.request.ContactFormRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.service.ContactService;
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
@RequestMapping("/api/v1/contact")
@Tag(name = "Contact", description = "Contact form submissions")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @Operation(summary = "Submit a contact form")
    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submit(
            @Valid @RequestBody ContactFormRequest request) {
        SubmissionResponse data = contactService.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Message sent successfully", data));
    }
}
