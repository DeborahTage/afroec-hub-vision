package com.afroechub.service;

import com.afroechub.dto.request.PartnerInquiryRequest;
import com.afroechub.dto.response.StatusLookupResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.PartnerInquiry;
import com.afroechub.enums.PartnerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PartnerService {

    SubmissionResponse submit(PartnerInquiryRequest request);

    StatusLookupResponse getStatus(Long id, String email);

    PartnerInquiry findById(Long id);

    Page<PartnerInquiry> search(String query, PartnerStatus status, Pageable pageable);

    PartnerInquiry update(Long id, PartnerStatus status, String assignedTo, String notes);

    void delete(Long id);
}
