package com.afroechub.repository;

import com.afroechub.entity.AmbassadorApplication;
import com.afroechub.enums.AmbassadorStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AmbassadorApplicationRepository
        extends JpaRepository<AmbassadorApplication, Long>, JpaSpecificationExecutor<AmbassadorApplication> {
    long countByStatus(AmbassadorStatus status);
}
