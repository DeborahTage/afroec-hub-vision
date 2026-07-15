package com.afroechub.entity;

import com.afroechub.enums.Availability;
import com.afroechub.enums.CommitmentDuration;
import com.afroechub.enums.ExperienceLevel;
import com.afroechub.enums.VolunteerRole;
import com.afroechub.enums.VolunteerStatus;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "volunteer_applications", indexes = {
        @Index(name = "idx_volunteer_email", columnList = "email"),
        @Index(name = "idx_volunteer_status", columnList = "status"),
        @Index(name = "idx_volunteer_role", columnList = "primary_role")
})
@Getter
@Setter
@NoArgsConstructor
public class VolunteerApplication extends BaseEntity {

    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(nullable = false, length = 50)
    private String phone;

    @Column(length = 100)
    private String telegram;

    @Column(nullable = false, length = 100)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(name = "primary_role", nullable = false, length = 50)
    private VolunteerRole primaryRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "secondary_role", length = 50)
    private VolunteerRole secondaryRole;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Availability availability;

    @Column(name = "hours_per_week")
    private Integer hoursPerWeek;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "commitment_duration", length = 50)
    private CommitmentDuration commitmentDuration;

    @Column(name = "professional_background", nullable = false, columnDefinition = "TEXT")
    private String professionalBackground;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String motivation;

    @ElementCollection
    @CollectionTable(name = "volunteer_skills",
            joinColumns = @JoinColumn(name = "volunteer_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "volunteer_languages",
            joinColumns = @JoinColumn(name = "volunteer_id"))
    @Column(name = "language")
    private List<String> languages = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level", length = 50)
    private ExperienceLevel experienceLevel;

    @Column(name = "portfolio_link", length = 500)
    private String portfolioLink;

    @Column(name = "resume_link", length = 500)
    private String resumeLink;

    @Column(name = "references_contact", columnDefinition = "TEXT")
    private String referencesContact;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private VolunteerStatus status = VolunteerStatus.PENDING;

    @Column(nullable = false)
    private Boolean onboarded = false;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
