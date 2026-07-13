package com.afroechub.repository;

import com.afroechub.entity.PartnerInquiry;
import com.afroechub.enums.PartnerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerInquiryRepository
        extends JpaRepository<PartnerInquiry, Long>, JpaSpecificationExecutor<PartnerInquiry> {

    long countByStatus(PartnerStatus status);

    Optional<PartnerInquiry> findByIdAndEmailIgnoreCase(Long id, String email);
}
