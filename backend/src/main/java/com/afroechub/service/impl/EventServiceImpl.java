package com.afroechub.service.impl;

import com.afroechub.dto.request.EventRegistrationRequest;
import com.afroechub.dto.request.EventUpsertRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.Event;
import com.afroechub.entity.EventRegistration;
import com.afroechub.enums.EventStatus;
import com.afroechub.exception.InvalidRequestException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.EventRegistrationRepository;
import com.afroechub.repository.EventRepository;
import com.afroechub.service.EmailService;
import com.afroechub.service.EventService;
import com.afroechub.util.ValidationUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;
    private final EmailService emailService;

    public EventServiceImpl(EventRepository eventRepository,
                            EventRegistrationRepository registrationRepository,
                            EmailService emailService) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
        this.emailService = emailService;
    }

    @Override @Transactional(readOnly = true)
    public List<Event> listPublished(EventStatus status, String category) {
        List<Event> events = status != null
                ? eventRepository.findByPublishedTrueAndStatusOrderByEventDateAsc(status)
                : eventRepository.findByPublishedTrueOrderByEventDateAsc();
        if (category != null && !category.isBlank() && !"ALL".equalsIgnoreCase(category)) {
            return events.stream()
                    .filter(e -> category.equalsIgnoreCase(e.getCategory()))
                    .collect(Collectors.toList());
        }
        return events;
    }

    @Override @Transactional(readOnly = true)
    public Event getPublishedBySlug(String slug) {
        Event e = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        if (!Boolean.TRUE.equals(e.getPublished())) {
            throw new ResourceNotFoundException("Event not found");
        }
        return e;
    }

    @Override @Transactional
    public SubmissionResponse register(Long eventId, EventRegistrationRequest request) {
        Event event = findById(eventId);
        if (!Boolean.TRUE.equals(event.getPublished()) || event.getStatus() == EventStatus.PAST
                || event.getStatus() == EventStatus.CANCELLED) {
            throw new InvalidRequestException("Registration is closed for this event");
        }
        if (event.getMaxAttendees() != null) {
            long count = registrationRepository.countByEventId(eventId);
            if (count >= event.getMaxAttendees()) {
                throw new InvalidRequestException("This event is fully booked");
            }
        }
        EventRegistration reg = new EventRegistration();
        reg.setEvent(event);
        reg.setFullName(ValidationUtil.sanitize(request.fullName()));
        reg.setEmail(request.email().trim().toLowerCase());
        reg.setPhone(ValidationUtil.sanitizeNullable(request.phone()));
        reg.setInstitution(ValidationUtil.sanitizeNullable(request.institution()));
        reg.setDietaryRequirements(ValidationUtil.sanitizeNullable(request.dietaryRequirements()));
        EventRegistration saved = registrationRepository.save(reg);

        emailService.notifySupport(
                "New Event Registration: " + event.getTitle(),
                "Event: " + event.getTitle() + "\nName: " + saved.getFullName()
                        + "\nEmail: " + saved.getEmail() + "\nDate: " + LocalDateTime.now());
        emailService.sendTemplated(saved.getEmail(), "Afroec Hub — Event registration confirmed",
                "application-confirmation",
                Map.of("fullName", saved.getFullName(), "applicationId", "EVT-" + event.getId()));

        return new SubmissionResponse(saved.getId(), "EVT-" + event.getId() + "-" + saved.getId(),
                "REGISTERED", saved.getCreatedAt(), "You are registered. We will email event details soon.");
    }

    @Override @Transactional(readOnly = true)
    public List<Event> listAll() { return eventRepository.findAllByOrderByEventDateDesc(); }

    @Override @Transactional(readOnly = true)
    public Event findById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event", id));
    }

    @Override @Transactional
    public Event create(EventUpsertRequest r) {
        Event e = new Event();
        apply(e, r);
        if (e.getSlug() == null || e.getSlug().isBlank()) {
            e.setSlug(slugify(e.getTitle()));
        }
        return eventRepository.save(e);
    }

    @Override @Transactional
    public Event update(Long id, EventUpsertRequest r) {
        Event e = findById(id);
        apply(e, r);
        return eventRepository.save(e);
    }

    @Override @Transactional
    public void delete(Long id) {
        if (!eventRepository.existsById(id)) throw new ResourceNotFoundException("Event", id);
        eventRepository.deleteById(id);
    }

    @Override @Transactional(readOnly = true)
    public List<EventRegistration> registrations(Long eventId) {
        findById(eventId);
        return registrationRepository.findByEventIdOrderByCreatedAtDesc(eventId);
    }

    private void apply(Event e, EventUpsertRequest r) {
        e.setTitle(ValidationUtil.sanitize(r.title()));
        if (r.slug() != null && !r.slug().isBlank()) e.setSlug(slugify(r.slug()));
        e.setDescription(ValidationUtil.sanitizeNullable(r.description()));
        e.setContent(r.content());
        e.setEventDate(r.eventDate());
        e.setEventTime(r.eventTime());
        e.setLocation(ValidationUtil.sanitizeNullable(r.location()));
        e.setImageUrl(ValidationUtil.sanitizeNullable(r.imageUrl()));
        e.setRegistrationLink(ValidationUtil.sanitizeNullable(r.registrationLink()));
        e.setMaxAttendees(r.maxAttendees());
        e.setCategory(ValidationUtil.sanitizeNullable(r.category()));
        if (r.status() != null) e.setStatus(r.status());
        if (r.published() != null) e.setPublished(r.published());
    }

    private static String slugify(String input) {
        return input.trim().toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");
    }
}
