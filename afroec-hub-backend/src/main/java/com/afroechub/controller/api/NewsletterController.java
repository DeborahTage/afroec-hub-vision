package com.afroechub.controller.api;

import com.afroechub.dto.request.NewsletterSubscriptionRequest;
import com.afroechub.dto.request.NewsletterUnsubscribeRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.service.NewsletterService;
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
@RequestMapping("/api/v1/newsletter")
@Tag(name = "Newsletter", description = "Newsletter subscriptions")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @Operation(summary = "Subscribe to the newsletter")
    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<Void>> subscribe(
            @Valid @RequestBody NewsletterSubscriptionRequest request) {
        newsletterService.subscribe(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Subscribed successfully"));
    }

    @Operation(summary = "Unsubscribe using a one-time token only (no email)")
    @PostMapping("/unsubscribe")
    public ResponseEntity<ApiResponse<Void>> unsubscribe(
            @Valid @RequestBody NewsletterUnsubscribeRequest request) {
        newsletterService.unsubscribe(request.token());
        return ResponseEntity.ok(ApiResponse.ok("Unsubscribed successfully"));
    }
}
