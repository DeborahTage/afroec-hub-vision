package com.afroechub.service.impl;

import com.afroechub.dto.request.VolunteerApplicationRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.VolunteerApplication;
import com.afroechub.enums.VolunteerStatus;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.VolunteerApplicationRepository;
import com.afroechub.service.EmailService;
import com.afroechub.service.VolunteerService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    private static final String NEXT_STEPS =
            "Thanks for volunteering! We'll review your application and share onboarding details soon.";

    private final VolunteerApplicationRepository repository;
    private final EmailService emailService;

    public VolunteerServiceImpl(VolunteerApplicationRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public SubmissionResponse submit(VolunteerApplicationRequest r) {
        VolunteerApplication v = new VolunteerApplication();
        v.setFullName(r.fullName());
        v.setEmail(r.email());
        v.setPhone(r.phone());
        v.setTelegram(r.telegram());
        v.setCity(r.city());
        v.setPrimaryRole(r.primaryRole());
        v.setSecondaryRole(r.secondaryRole());
        v.setAvailability(r.availability());
        v.setHoursPerWeek(r.hoursPerWeek());
        v.setStartDate(r.startDate());
        v.setCommitmentDuration(r.commitmentDuration());
        v.setProfessionalBackground(r.professionalBackground());
        v.setMotivation(r.motivation());
        v.setSkills(r.skills() != null ? r.skills() : new ArrayList<>());
        v.setLanguages(r.languages() != null ? r.languages() : new ArrayList<>());
        v.setExperienceLevel(r.experienceLevel());
        v.setPortfolioLink(r.portfolioLink());
        v.setResumeLink(r.resumeLink());
        v.setReferencesContact(r.referencesContact());
        v.setStatus(VolunteerStatus.PENDING);
        VolunteerApplication saved = repository.save(v);

        emailService.sendTemplated(saved.getEmail(),
                "Afroec Hub — Volunteer application received",
                "volunteer-welcome",
                Map.of("fullName", saved.getFullName()));

        return new SubmissionResponse(saved.getId(), null,
                saved.getStatus().name(), saved.getCreatedAt(), NEXT_STEPS);
    }

    @Transactional(readOnly = true)
    @Override
    public VolunteerApplication getStatus(Long id) {
        return findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public VolunteerApplication findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer application", id));
    }

    @Transactional(readOnly = true)
    @Override
    public Page<VolunteerApplication> search(String query, VolunteerStatus status, Pageable pageable) {
        Specification<VolunteerApplication> spec = (root, cq, cb) -> {
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
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return repository.findAll(spec, pageable);
    }

    @Transactional
    @Override
    public VolunteerApplication update(Long id, VolunteerStatus status, Boolean onboarded, String notes) {
        VolunteerApplication v = findById(id);
        if (status != null) {
            v.setStatus(status);
        }
        if (onboarded != null) {
            v.setOnboarded(onboarded);
        }
        if (notes != null) {
            v.setNotes(notes);
        }
        return repository.save(v);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Volunteer application", id);
        }
        repository.deleteById(id);
    }
}
