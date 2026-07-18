package com.afroechub.service;

import com.afroechub.dto.request.EventRegistrationRequest;
import com.afroechub.dto.request.EventUpsertRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.Event;
import com.afroechub.entity.EventRegistration;
import com.afroechub.enums.EventStatus;

import java.util.List;

public interface EventService {
    List<Event> listPublished(EventStatus status, String category);
    Event getPublishedBySlug(String slug);
    SubmissionResponse register(Long eventId, EventRegistrationRequest request);
    List<Event> listAll();
    Event findById(Long id);
    Event create(EventUpsertRequest request);
    Event update(Long id, EventUpsertRequest request);
    void delete(Long id);
    List<EventRegistration> registrations(Long eventId);
}
