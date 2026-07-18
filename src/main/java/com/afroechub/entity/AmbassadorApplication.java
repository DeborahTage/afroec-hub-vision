package com.afroechub.entity;

import com.afroechub.enums.AmbassadorStatus;
import com.afroechub.enums.Gender;
import com.afroechub.enums.InstitutionType;
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
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ambassador_applications", indexes = {
        @Index(name = "idx_ambassador_email", columnList = "email"),
        @Index(name = "idx_ambassador_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
public class AmbassadorApplication extends BaseEntity {

    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Gender gender;

    @Column(length = 100)
    private String city;

    @Column(name = "institution_name", length = 200)
    private String institutionName;

    @Enumerated(EnumType.STRING)
    @Column(name = "institution_type", length = 50)
    private InstitutionType institutionType;

    @Column(name = "grade_level", length = 50)
    private String gradeLevel;

    @Column(name = "field_of_study", length = 200)
    private String fieldOfStudy;

    @Column(name = "motivation_letter", columnDefinition = "TEXT")
    private String motivationLetter;

    @Column(name = "leadership_experience", columnDefinition = "TEXT")
    private String leadershipExperience;

    @Column(name = "tech_skills", columnDefinition = "TEXT")
    private String techSkills;

    @Column(name = "hours_per_week")
    private Integer hoursPerWeek;

    @Column(name = "proposed_club_name", length = 200)
    private String proposedClubName;

    @Column(name = "estimated_members")
    private Integer estimatedMembers;

    @Column(name = "support_needed", columnDefinition = "TEXT")
    private String supportNeeded;

    @Column(name = "cv_url", length = 500)
    private String cvUrl;

    @Column(name = "recommendation_letter_url", length = 500)
    private String recommendationLetterUrl;

    @Column(name = "portfolio_url", length = 500)
    private String portfolioUrl;

    @Column(name = "commit_hours", nullable = false)
    private Boolean commitHours = false;

    @Column(name = "commit_club", nullable = false)
    private Boolean commitClub = false;

    @Column(name = "commit_bootcamp", nullable = false)
    private Boolean commitBootcamp = false;

    @Column(name = "agree_conduct", nullable = false)
    private Boolean agreeConduct = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AmbassadorStatus status = AmbassadorStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
