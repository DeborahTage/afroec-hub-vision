package com.afroechub.service;

import com.afroechub.dto.request.VolunteerApplicationRequest;
import com.afroechub.dto.response.StatusLookupResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.VolunteerApplication;
import com.afroechub.enums.VolunteerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VolunteerService {

    SubmissionResponse submit(VolunteerApplicationRequest request);

    StatusLookupResponse getStatus(Long id, String email);

    VolunteerApplication findById(Long id);

    Page<VolunteerApplication> search(String query, VolunteerStatus status, Pageable pageable);

    VolunteerApplication update(Long id, VolunteerStatus status, Boolean onboarded, String notes);

    void delete(Long id);
}
