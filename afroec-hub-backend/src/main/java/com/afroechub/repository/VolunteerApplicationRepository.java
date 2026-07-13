package com.afroechub.repository;

import com.afroechub.entity.VolunteerApplication;
import com.afroechub.enums.VolunteerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VolunteerApplicationRepository
        extends JpaRepository<VolunteerApplication, Long>, JpaSpecificationExecutor<VolunteerApplication> {

    long countByStatus(VolunteerStatus status);

    long countByOnboardedTrue();

    Optional<VolunteerApplication> findByIdAndEmailIgnoreCase(Long id, String email);
}
