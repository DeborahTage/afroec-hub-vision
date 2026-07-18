package com.afroechub.dto.request;

import com.afroechub.enums.EventStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventUpsertRequest(
        @NotBlank @Size(max = 200) String title,
        @Size(max = 200) String slug,
        @Size(max = 5000) String description,
        String content,
        LocalDate eventDate,
        LocalTime eventTime,
        @Size(max = 300) String location,
        @Size(max = 500) String imageUrl,
        @Size(max = 500) String registrationLink,
        Integer maxAttendees,
        @Size(max = 50) String category,
        EventStatus status,
        Boolean published
) {}
