package com.afroechub.service;

import com.afroechub.dto.request.AcademyApplicationRequest;
import com.afroechub.dto.request.CommunityProgramRequest;
import com.afroechub.dto.request.ProductHubApplicationRequest;
import com.afroechub.dto.request.StudentApplicationRequest;
import com.afroechub.dto.response.ApplicationResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.StudentApplication;
import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.ProgramType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ApplicationService {

    SubmissionResponse submitStudent(StudentApplicationRequest request);

    SubmissionResponse submitAcademy(AcademyApplicationRequest request);

    SubmissionResponse submitProductHub(ProductHubApplicationRequest request);

    SubmissionResponse submitCommunity(CommunityProgramRequest request);

    ApplicationResponse getStatus(Long id, String email);

    // Admin operations
    StudentApplication findById(Long id);

    Page<StudentApplication> search(String query, ApplicationStatus status,
                                    ProgramType programType, Pageable pageable);

    StudentApplication updateStatus(Long id, ApplicationStatus status, String notes);

    void delete(Long id);
}
