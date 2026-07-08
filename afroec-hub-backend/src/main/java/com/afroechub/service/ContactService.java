package com.afroechub.service;

import com.afroechub.dto.request.ContactFormRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.ContactSubmission;
import com.afroechub.enums.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactService {

    SubmissionResponse submit(ContactFormRequest request);

    ContactSubmission findById(Long id);

    Page<ContactSubmission> search(String query, ContactStatus status, Pageable pageable);

    ContactSubmission reply(Long id, String responseText);

    ContactSubmission updateStatus(Long id, ContactStatus status);

    void delete(Long id);
}
