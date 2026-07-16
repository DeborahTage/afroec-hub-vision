package com.afroechub.dto.request;

import com.afroechub.enums.PartnerType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record PartnerInquiryRequest(
        @NotBlank @Size(max = 200) String organizationName,
        @NotBlank @Size(max = 200) String contactPerson,
        @NotBlank @Email @Size(max = 200) String email,
        @Size(max = 50) String phone,
        @NotNull PartnerType organizationType,
        List<String> partnershipInterest,
        @NotBlank @Size(max = 5000) String message
) {
}
