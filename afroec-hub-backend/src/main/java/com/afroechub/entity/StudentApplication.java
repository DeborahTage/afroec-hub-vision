package com.afroechub.entity;

import com.afroechub.enums.AcademyTrack;
import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.Availability;
import com.afroechub.enums.CommunityProgramType;
import com.afroechub.enums.EducationLevel;
import com.afroechub.enums.EmploymentStatus;
import com.afroechub.enums.Gender;
import com.afroechub.enums.ProgramType;
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
@Table(name = "student_applications", indexes = {
        @Index(name = "idx_student_email", columnList = "email"),
        @Index(name = "idx_student_status", columnList = "status"),
        @Index(name = "idx_student_program", columnList = "program_type"),
        @Index(name = "idx_student_created", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
public class StudentApplication extends BaseEntity {

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

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "education_level", length = 50)
    private EducationLevel educationLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_status", length = 50)
    private EmploymentStatus employmentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "program_type", nullable = false, length = 50)
    private ProgramType programType;

    @Enumerated(EnumType.STRING)
    @Column(name = "academy_track", length = 50)
    private AcademyTrack academyTrack;

    @Enumerated(EnumType.STRING)
    @Column(name = "community_program", length = 50)
    private CommunityProgramType communityProgram;

    @Column(name = "prior_experience", columnDefinition = "TEXT")
    private String priorExperience;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String motivation;

    @Column(name = "career_goals", columnDefinition = "TEXT")
    private String careerGoals;

    @Column(name = "github_portfolio", length = 500)
    private String githubPortfolio;

    @Column(name = "income_share_agreement")
    private Boolean incomeShareAgreement = false;

    @Column(name = "how_did_you_hear", length = 100)
    private String howDidYouHear;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Availability availability;

    @Column(name = "preferred_start_date")
    private LocalDate preferredStartDate;

    @Column(name = "can_commit_fulltime")
    private Boolean canCommitFulltime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
