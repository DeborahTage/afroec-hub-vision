package com.afroechub.repository;

import com.afroechub.entity.InternshipApplication;
import com.afroechub.enums.InternshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipApplicationRepository
        extends JpaRepository<InternshipApplication, Long>, JpaSpecificationExecutor<InternshipApplication> {
    long countByStatus(InternshipStatus status);
}
