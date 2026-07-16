package com.afroechub.entity;

import com.afroechub.enums.EventStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events", indexes = {
        @Index(name = "idx_events_slug", columnList = "slug", unique = true),
        @Index(name = "idx_events_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
public class Event extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "event_time")
    private LocalTime eventTime;

    @Column(length = 300)
    private String location;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "registration_link", length = 500)
    private String registrationLink;

    @Column(name = "max_attendees")
    private Integer maxAttendees;

    @Column(length = 50)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EventStatus status = EventStatus.UPCOMING;

    @Column(name = "is_published", nullable = false)
    private Boolean published = false;
}
