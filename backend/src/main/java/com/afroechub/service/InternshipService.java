package com.afroechub.service;

import com.afroechub.dto.request.InternshipApplicationRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.InternshipApplication;
import com.afroechub.enums.InternshipStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InternshipService {
    SubmissionResponse submit(InternshipApplicationRequest request);
    InternshipApplication findById(Long id);
    Page<InternshipApplication> search(String query, InternshipStatus status, Pageable pageable);
    InternshipApplication updateStatus(Long id, InternshipStatus status, String notes);
    void delete(Long id);
}
