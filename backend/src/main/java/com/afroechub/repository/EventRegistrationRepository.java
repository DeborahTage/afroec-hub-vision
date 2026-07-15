package com.afroechub.repository;

import com.afroechub.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByEventIdOrderByCreatedAtDesc(Long eventId);
    long countByEventId(Long eventId);
}
