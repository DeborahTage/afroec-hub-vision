package com.afroechub.repository;

import com.afroechub.entity.ContactSubmission;
import com.afroechub.enums.ContactStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactSubmissionRepository
        extends JpaRepository<ContactSubmission, Long>, JpaSpecificationExecutor<ContactSubmission> {

    long countByStatus(ContactStatus status);
}
