package com.afroechub.service;

import com.afroechub.dto.request.AmbassadorApplicationRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.AmbassadorApplication;
import com.afroechub.enums.AmbassadorStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AmbassadorService {
    SubmissionResponse submit(AmbassadorApplicationRequest request);
    AmbassadorApplication findById(Long id);
    Page<AmbassadorApplication> search(String query, AmbassadorStatus status, Pageable pageable);
    AmbassadorApplication updateStatus(Long id, AmbassadorStatus status, String notes);
    void delete(Long id);
}
