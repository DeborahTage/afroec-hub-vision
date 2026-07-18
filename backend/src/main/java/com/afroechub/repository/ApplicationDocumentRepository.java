package com.afroechub.repository;

import com.afroechub.entity.ApplicationDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationDocumentRepository extends JpaRepository<ApplicationDocument, Long> {
    Optional<ApplicationDocument> findByToken(String token);
}
