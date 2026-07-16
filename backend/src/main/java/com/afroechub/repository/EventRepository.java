package com.afroechub.repository;

import com.afroechub.entity.Event;
import com.afroechub.enums.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findBySlug(String slug);
    List<Event> findByPublishedTrueOrderByEventDateAsc();
    List<Event> findByPublishedTrueAndStatusOrderByEventDateAsc(EventStatus status);
    List<Event> findAllByOrderByEventDateDesc();
}
