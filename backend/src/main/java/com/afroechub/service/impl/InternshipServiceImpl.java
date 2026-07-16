package com.afroechub.service.impl;

import com.afroechub.dto.request.InternshipApplicationRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.InternshipApplication;
import com.afroechub.enums.InternshipStatus;
import com.afroechub.exception.InvalidRequestException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.InternshipApplicationRepository;
import com.afroechub.service.EmailService;
import com.afroechub.service.InternshipService;
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
public class InternshipServiceImpl implements InternshipService {

    private static final String NEXT = "We will review your internship application and contact you soon.";

    private final InternshipApplicationRepository repository;
    private final EmailService emailService;

    public InternshipServiceImpl(InternshipApplicationRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public SubmissionResponse submit(InternshipApplicationRequest r) {
        if (!Boolean.TRUE.equals(r.agreeUnpaid()) || !Boolean.TRUE.equals(r.agreeDuration())
                || !Boolean.TRUE.equals(r.agreePolicies())) {
            throw new InvalidRequestException("You must accept all internship agreements");
        }
        InternshipApplication a = new InternshipApplication();
        a.setFullName(ValidationUtil.sanitize(r.fullName()));
        a.setEmail(r.email().trim().toLowerCase());
        a.setPhone(ValidationUtil.sanitize(r.phone()));
        a.setLinkedinUrl(ValidationUtil.sanitizeNullable(r.linkedinUrl()));
        a.setInstitution(ValidationUtil.sanitize(r.institution()));
        a.setFieldOfStudy(ValidationUtil.sanitize(r.fieldOfStudy()));
        a.setYearOfStudy(ValidationUtil.sanitize(r.yearOfStudy()));
        a.setGraduationDate(r.graduationDate());
        a.setDepartment(r.department());
        a.setDuration(r.duration());
        a.setStartDate(r.startDate());
        a.setFullTime(r.fullTime());
        a.setSkills(StringListUtil.join(r.skills()));
        a.setExperience(ValidationUtil.sanitizeNullable(r.experience()));
        a.setProjectLinks(ValidationUtil.sanitizeNullable(r.projectLinks()));
        a.setGithubUrl(ValidationUtil.sanitizeNullable(r.githubUrl()));
        a.setMotivationAfroec(ValidationUtil.sanitize(r.motivationAfroec()));
        a.setLearningGoals(ValidationUtil.sanitize(r.learningGoals()));
        a.setCvUrl(ValidationUtil.sanitize(r.cvUrl()));
        a.setCoverLetterUrl(ValidationUtil.sanitizeNullable(r.coverLetterUrl()));
        a.setTranscriptUrl(ValidationUtil.sanitizeNullable(r.transcriptUrl()));
        a.setAgreeUnpaid(true);
        a.setAgreeDuration(true);
        a.setAgreePolicies(true);
        a.setStatus(InternshipStatus.PENDING);
        InternshipApplication saved = repository.save(a);

        String ref = "INT-" + saved.getId();
        emailService.sendTemplated(saved.getEmail(), "Afroec Hub — Internship application received",
                "application-confirmation",
                Map.of("fullName", saved.getFullName(), "applicationId", ref));
        emailService.notifySupport(
                "New Internship Application: " + saved.getFullName(),
                "Type: Internship\nName: " + saved.getFullName()
                        + "\nEmail: " + saved.getEmail()
                        + "\nDepartment: " + saved.getDepartment()
                        + "\nApplication ID: " + saved.getId()
                        + "\nDate: " + LocalDateTime.now()
                        + "\nView: http://localhost:8092/admin/internships/" + saved.getId());

        return new SubmissionResponse(saved.getId(), ref, saved.getStatus().name(), saved.getCreatedAt(), NEXT);
    }

    @Override @Transactional(readOnly = true)
    public InternshipApplication findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Internship application", id));
    }

    @Override @Transactional(readOnly = true)
    public Page<InternshipApplication> search(String query, InternshipStatus status, Pageable pageable) {
        Specification<InternshipApplication> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("fullName")), like),
                        cb.like(cb.lower(root.get("email")), like),
                        cb.like(cb.lower(root.get("institution")), like)));
            }
            if (status != null) predicates.add(cb.equal(root.get("status"), status));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(spec, pageable);
    }

    @Override @Transactional
    public InternshipApplication updateStatus(Long id, InternshipStatus status, String notes) {
        InternshipApplication a = findById(id);
        if (status != null) a.setStatus(status);
        if (notes != null) a.setNotes(ValidationUtil.sanitizeNullable(notes));
        return repository.save(a);
    }

    @Override @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new ResourceNotFoundException("Internship application", id);
        repository.deleteById(id);
    }
}
