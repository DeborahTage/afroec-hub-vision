package com.afroechub.service.impl;

import com.afroechub.dto.request.AcademyApplicationRequest;
import com.afroechub.dto.request.CommunityProgramRequest;
import com.afroechub.dto.request.ProductHubApplicationRequest;
import com.afroechub.dto.request.StudentApplicationRequest;
import com.afroechub.dto.response.ApplicationResponse;
import com.afroechub.dto.response.StatusLookupResponse;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.StudentApplication;
import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.ProgramType;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.StudentApplicationRepository;
import com.afroechub.service.ApplicationService;
import com.afroechub.service.EmailService;
import com.afroechub.util.ValidationUtil;
import jakarta.persistence.criteria.Predicate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private static final Logger log = LoggerFactory.getLogger(ApplicationServiceImpl.class);
    private static final String NEXT_STEPS =
            "We will review your application and contact you within 2 weeks.";

    private final StudentApplicationRepository repository;
    private final EmailService emailService;

    public ApplicationServiceImpl(StudentApplicationRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public SubmissionResponse submitStudent(StudentApplicationRequest r) {
        StudentApplication a = new StudentApplication();
        a.setFullName(ValidationUtil.sanitize(r.fullName()));
        a.setEmail(r.email().trim().toLowerCase());
        a.setPhone(ValidationUtil.sanitize(r.phone()));
        a.setTelegram(ValidationUtil.sanitizeNullable(r.telegram()));
        a.setCity(ValidationUtil.sanitize(r.city()));
        a.setDateOfBirth(r.dateOfBirth());
        a.setGender(r.gender());
        a.setEducationLevel(r.educationLevel());
        a.setEmploymentStatus(r.employmentStatus());
        a.setProgramType(r.programType());
        a.setAcademyTrack(r.academyTrack());
        a.setCommunityProgram(r.communityProgram());
        a.setPriorExperience(ValidationUtil.sanitizeNullable(r.priorExperience()));
        a.setMotivation(ValidationUtil.sanitize(r.motivation()));
        a.setCareerGoals(ValidationUtil.sanitizeNullable(r.careerGoals()));
        a.setGithubPortfolio(ValidationUtil.sanitizeNullable(r.githubPortfolio()));
        a.setIncomeShareAgreement(Boolean.TRUE.equals(r.incomeShareAgreement()));
        a.setHowDidYouHear(ValidationUtil.sanitizeNullable(r.howDidYouHear()));
        a.setAvailability(r.availability());
        a.setPreferredStartDate(r.preferredStartDate());
        a.setCanCommitFulltime(r.canCommitFulltime());
        a.setStatus(ApplicationStatus.PENDING);
        return persistAndNotify(a);
    }

    @Transactional
    @Override
    public SubmissionResponse submitAcademy(AcademyApplicationRequest r) {
        StudentApplication a = new StudentApplication();
        a.setFullName(ValidationUtil.sanitize(r.fullName()));
        a.setEmail(r.email().trim().toLowerCase());
        a.setPhone(ValidationUtil.sanitize(r.phone()));
        a.setTelegram(ValidationUtil.sanitizeNullable(r.telegram()));
        a.setCity(ValidationUtil.sanitize(r.city()));
        a.setDateOfBirth(r.dateOfBirth());
        a.setGender(r.gender());
        a.setEducationLevel(r.educationLevel());
        a.setEmploymentStatus(r.employmentStatus());
        a.setProgramType(ProgramType.ACADEMY);
        a.setAcademyTrack(r.academyTrack());
        a.setPriorExperience(ValidationUtil.sanitizeNullable(r.priorExperience()));
        a.setMotivation(ValidationUtil.sanitize(r.motivation()));
        a.setCareerGoals(ValidationUtil.sanitizeNullable(r.careerGoals()));
        a.setGithubPortfolio(ValidationUtil.sanitizeNullable(r.githubPortfolio()));
        a.setIncomeShareAgreement(Boolean.TRUE.equals(r.incomeShareAgreement()));
        a.setHowDidYouHear(ValidationUtil.sanitizeNullable(r.howDidYouHear()));
        a.setAvailability(r.availability());
        a.setPreferredStartDate(r.preferredStartDate());
        a.setCanCommitFulltime(r.canCommitFulltime());
        return persistAndNotify(a);
    }

    @Transactional
    @Override
    public SubmissionResponse submitProductHub(ProductHubApplicationRequest r) {
        StudentApplication a = new StudentApplication();
        a.setFullName(ValidationUtil.sanitize(r.fullName()));
        a.setEmail(r.email().trim().toLowerCase());
        a.setPhone(ValidationUtil.sanitize(r.phone()));
        a.setTelegram(ValidationUtil.sanitizeNullable(r.telegram()));
        a.setCity(ValidationUtil.sanitize(r.city()));
        a.setGender(r.gender());
        a.setEducationLevel(r.educationLevel());
        a.setEmploymentStatus(r.employmentStatus());
        a.setProgramType(ProgramType.PRODUCT_HUB);
        a.setPriorExperience(ValidationUtil.sanitizeNullable(r.priorExperience()));
        a.setMotivation(ValidationUtil.sanitize(r.motivation()));
        a.setCareerGoals(ValidationUtil.sanitizeNullable(r.careerGoals()));
        a.setGithubPortfolio(ValidationUtil.sanitizeNullable(r.githubPortfolio()));
        a.setHowDidYouHear(ValidationUtil.sanitizeNullable(r.howDidYouHear()));
        a.setAvailability(r.availability());
        a.setPreferredStartDate(r.preferredStartDate());
        a.setCanCommitFulltime(r.canCommitFulltime());
        return persistAndNotify(a);
    }

    @Transactional
    @Override
    public SubmissionResponse submitCommunity(CommunityProgramRequest r) {
        StudentApplication a = new StudentApplication();
        a.setFullName(ValidationUtil.sanitize(r.fullName()));
        a.setEmail(r.email().trim().toLowerCase());
        a.setPhone(ValidationUtil.sanitize(r.phone()));
        a.setTelegram(ValidationUtil.sanitizeNullable(r.telegram()));
        a.setCity(ValidationUtil.sanitize(r.city()));
        a.setGender(r.gender());
        a.setEducationLevel(r.educationLevel());
        a.setProgramType(ProgramType.COMMUNITY);
        a.setCommunityProgram(r.communityProgram());
        a.setMotivation(ValidationUtil.sanitize(r.motivation()));
        a.setHowDidYouHear(ValidationUtil.sanitizeNullable(r.howDidYouHear()));
        a.setAvailability(r.availability());
        a.setPreferredStartDate(r.preferredStartDate());
        return persistAndNotify(a);
    }

    private SubmissionResponse persistAndNotify(StudentApplication a) {
        StudentApplication saved = repository.save(a);
        String applicationId = ApplicationResponse.formatApplicationId(saved.getId(), saved.getCreatedAt());
        log.info("Student application {} submitted by {}", applicationId, saved.getEmail());
        emailService.sendTemplated(saved.getEmail(),
                "Afroec Hub — Application received",
                "application-confirmation",
                Map.of("fullName", saved.getFullName(), "applicationId", applicationId));
        return new SubmissionResponse(saved.getId(), applicationId,
                saved.getStatus().name(), saved.getCreatedAt(), NEXT_STEPS);
    }

    @Transactional(readOnly = true)
    @Override
    public StatusLookupResponse getStatus(Long id, String email) {
        StudentApplication a = repository.findByIdAndEmailIgnoreCase(id, email.trim())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No application found for the provided id and email"));
        return new StatusLookupResponse(
                a.getId(),
                ApplicationResponse.formatApplicationId(a.getId(), a.getCreatedAt()),
                a.getStatus() != null ? a.getStatus().name() : null,
                a.getCreatedAt());
    }

    @Transactional(readOnly = true)
    @Override
    public StudentApplication findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application", id));
    }

    @Transactional(readOnly = true)
    @Override
    public Page<StudentApplication> search(String query, ApplicationStatus status,
                                           ProgramType programType, Pageable pageable) {
        Specification<StudentApplication> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("fullName")), like),
                        cb.like(cb.lower(root.get("email")), like)));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (programType != null) {
                predicates.add(cb.equal(root.get("programType"), programType));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(spec, pageable);
    }

    @Transactional
    @Override
    public StudentApplication updateStatus(Long id, ApplicationStatus status, String notes) {
        StudentApplication a = findById(id);
        ApplicationStatus previous = a.getStatus();
        if (status != null) {
            a.setStatus(status);
        }
        if (notes != null) {
            a.setNotes(ValidationUtil.sanitizeNullable(notes));
        }
        StudentApplication saved = repository.save(a);
        if (status != null && status != previous) {
            emailService.sendTemplated(saved.getEmail(),
                    "Afroec Hub — Application status update",
                    "application-confirmation",
                    Map.of("fullName", saved.getFullName(),
                            "applicationId", ApplicationResponse.formatApplicationId(saved.getId(), saved.getCreatedAt()),
                            "status", saved.getStatus().name()));
        }
        return saved;
    }

    @Transactional
    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Application", id);
        }
        repository.deleteById(id);
    }
}
