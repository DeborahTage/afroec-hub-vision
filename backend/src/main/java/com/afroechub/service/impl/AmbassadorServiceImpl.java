package com.afroechub.service.impl;

import com.afroechub.dto.request.AmbassadorApplicationRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.AmbassadorApplication;
import com.afroechub.enums.AmbassadorStatus;
import com.afroechub.exception.InvalidRequestException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.AmbassadorApplicationRepository;
import com.afroechub.service.AmbassadorService;
import com.afroechub.service.EmailService;
import com.afroechub.util.StringListUtil;
import com.afroechub.util.ValidationUtil;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AmbassadorServiceImpl implements AmbassadorService {

    private static final String NEXT = "We will review your ambassador application and contact you within 2 weeks.";

    private final AmbassadorApplicationRepository repository;
    private final EmailService emailService;

    public AmbassadorServiceImpl(AmbassadorApplicationRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public SubmissionResponse submit(AmbassadorApplicationRequest r) {
        if (!Boolean.TRUE.equals(r.commitHours()) || !Boolean.TRUE.equals(r.commitClub())
                || !Boolean.TRUE.equals(r.commitBootcamp()) || !Boolean.TRUE.equals(r.agreeConduct())) {
            throw new InvalidRequestException("You must accept all ambassador commitments");
        }
        AmbassadorApplication a = new AmbassadorApplication();
        a.setFullName(ValidationUtil.sanitize(r.fullName()));
        a.setEmail(r.email().trim().toLowerCase());
        a.setPhone(ValidationUtil.sanitize(r.phone()));
        a.setDateOfBirth(r.dateOfBirth());
        a.setGender(r.gender());
        a.setCity(ValidationUtil.sanitize(r.city()));
        a.setInstitutionName(ValidationUtil.sanitize(r.institutionName()));
        a.setInstitutionType(r.institutionType());
        a.setGradeLevel(ValidationUtil.sanitize(r.gradeLevel()));
        a.setFieldOfStudy(ValidationUtil.sanitizeNullable(r.fieldOfStudy()));
        a.setMotivationLetter(ValidationUtil.sanitize(r.motivationLetter()));
        a.setLeadershipExperience(ValidationUtil.sanitizeNullable(r.leadershipExperience()));
        a.setTechSkills(StringListUtil.join(r.techSkills()));
        a.setHoursPerWeek(r.hoursPerWeek());
        a.setProposedClubName(ValidationUtil.sanitize(r.proposedClubName()));
        a.setEstimatedMembers(r.estimatedMembers());
        a.setSupportNeeded(StringListUtil.join(r.supportNeeded()));
        a.setCvUrl(ValidationUtil.sanitizeNullable(r.cvUrl()));
        a.setRecommendationLetterUrl(ValidationUtil.sanitizeNullable(r.recommendationLetterUrl()));
        a.setPortfolioUrl(ValidationUtil.sanitizeNullable(r.portfolioUrl()));
        a.setCommitHours(true);
        a.setCommitClub(true);
        a.setCommitBootcamp(true);
        a.setAgreeConduct(true);
        a.setStatus(AmbassadorStatus.PENDING);
        AmbassadorApplication saved = repository.save(a);

        String ref = "AMB-" + saved.getId();
        emailService.sendTemplated(saved.getEmail(), "Afroec Hub — Ambassador application received",
                "application-confirmation",
                Map.of("fullName", saved.getFullName(), "applicationId", ref));
        emailService.notifySupport(
                "New Ambassador Application: " + saved.getFullName(),
                "Type: Ambassador\nName: " + saved.getFullName()
                        + "\nEmail: " + saved.getEmail()
                        + "\nInstitution: " + saved.getInstitutionName()
                        + "\nClub: " + saved.getProposedClubName()
                        + "\nApplication ID: " + saved.getId()
                        + "\nDate: " + LocalDateTime.now()
                        + "\nView: http://localhost:8092/admin/ambassadors/" + saved.getId());

        return new SubmissionResponse(saved.getId(), ref, saved.getStatus().name(), saved.getCreatedAt(), NEXT);
    }

    @Override
    @Transactional(readOnly = true)
    public AmbassadorApplication findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ambassador application", id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AmbassadorApplication> search(String query, AmbassadorStatus status, Pageable pageable) {
        Specification<AmbassadorApplication> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("fullName")), like),
                        cb.like(cb.lower(root.get("email")), like),
                        cb.like(cb.lower(root.get("institutionName")), like)));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(spec, pageable);
    }

    @Override
    @Transactional
    public AmbassadorApplication updateStatus(Long id, AmbassadorStatus status, String notes) {
        AmbassadorApplication a = findById(id);
        if (status != null) a.setStatus(status);
        if (notes != null) a.setNotes(ValidationUtil.sanitizeNullable(notes));
        return repository.save(a);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new ResourceNotFoundException("Ambassador application", id);
        repository.deleteById(id);
    }
}
