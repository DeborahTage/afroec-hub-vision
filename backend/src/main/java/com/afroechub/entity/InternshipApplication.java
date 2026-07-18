package com.afroechub.entity;

import com.afroechub.enums.InternshipDepartment;
import com.afroechub.enums.InternshipDuration;
import com.afroechub.enums.InternshipStatus;
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

@Entity
@Table(name = "internship_applications", indexes = {
        @Index(name = "idx_internship_email", columnList = "email"),
        @Index(name = "idx_internship_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
public class InternshipApplication extends BaseEntity {

    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(length = 200)
    private String institution;

    @Column(name = "field_of_study", length = 200)
    private String fieldOfStudy;

    @Column(name = "year_of_study", length = 50)
    private String yearOfStudy;

    @Column(name = "graduation_date")
    private LocalDate graduationDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private InternshipDepartment department;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private InternshipDuration duration;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "is_full_time")
    private Boolean fullTime;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String experience;

    @Column(name = "project_links", columnDefinition = "TEXT")
    private String projectLinks;

    @Column(name = "github_url", length = 500)
    private String githubUrl;

    @Column(name = "motivation_afroec", columnDefinition = "TEXT")
    private String motivationAfroec;

    @Column(name = "learning_goals", columnDefinition = "TEXT")
    private String learningGoals;

    @Column(name = "cv_url", length = 500)
    private String cvUrl;

    @Column(name = "cover_letter_url", length = 500)
    private String coverLetterUrl;

    @Column(name = "transcript_url", length = 500)
    private String transcriptUrl;

    @Column(name = "agree_unpaid", nullable = false)
    private Boolean agreeUnpaid = false;

    @Column(name = "agree_duration", nullable = false)
    private Boolean agreeDuration = false;

    @Column(name = "agree_policies", nullable = false)
    private Boolean agreePolicies = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private InternshipStatus status = InternshipStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
