package com.afroechub.service.impl;

import com.afroechub.dto.request.PartnerInquiryRequest;
import com.afroechub.dto.response.SubmissionResponse;
import com.afroechub.entity.PartnerInquiry;
import com.afroechub.enums.PartnerStatus;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.PartnerInquiryRepository;
import com.afroechub.service.EmailService;
import com.afroechub.service.PartnerService;
import com.afroechub.util.ValidationUtil;
import com.afroechub.dto.response.StatusLookupResponse;
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
public class PartnerServiceImpl implements PartnerService {

    private static final String NEXT_STEPS =
            "Thank you for reaching out. Our partnerships team will contact you shortly.";

    private final PartnerInquiryRepository repository;
    private final EmailService emailService;

    public PartnerServiceImpl(PartnerInquiryRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public SubmissionResponse submit(PartnerInquiryRequest r) {
        PartnerInquiry p = new PartnerInquiry();
        p.setOrganizationName(ValidationUtil.sanitize(r.organizationName()));
        p.setContactPerson(ValidationUtil.sanitize(r.contactPerson()));
        p.setEmail(r.email().trim().toLowerCase());
        p.setPhone(ValidationUtil.sanitizeNullable(r.phone()));
        p.setOrganizationType(r.organizationType());
        p.setPartnershipInterest(r.partnershipInterest() != null ? r.partnershipInterest() : new ArrayList<>());
        p.setMessage(ValidationUtil.sanitize(r.message()));
        p.setStatus(PartnerStatus.NEW);
        PartnerInquiry saved = repository.save(p);

        emailService.sendTemplated(saved.getEmail(),
                "Afroec Hub — Partnership inquiry received",
                "partner-welcome",
                Map.of("contactPerson", saved.getContactPerson(),
                        "organizationName", saved.getOrganizationName()));

        return new SubmissionResponse(saved.getId(), null,
                saved.getStatus().name(), saved.getCreatedAt(), NEXT_STEPS);
    }

    @Transactional(readOnly = true)
    @Override
    public StatusLookupResponse getStatus(Long id, String email) {
        PartnerInquiry p = repository.findByIdAndEmailIgnoreCase(id, email.trim())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No inquiry found for the provided id and email"));
        return new StatusLookupResponse(p.getId(), null,
                p.getStatus() != null ? p.getStatus().name() : null, p.getCreatedAt());
    }

    @Transactional(readOnly = true)
    @Override
    public PartnerInquiry findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner inquiry", id));
    }

    @Transactional(readOnly = true)
    @Override
    public Page<PartnerInquiry> search(String query, PartnerStatus status, Pageable pageable) {
        Specification<PartnerInquiry> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("organizationName")), like),
                        cb.like(cb.lower(root.get("contactPerson")), like),
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
    public PartnerInquiry update(Long id, PartnerStatus status, String assignedTo, String notes) {
        PartnerInquiry p = findById(id);
        if (status != null) {
            p.setStatus(status);
        }
        if (assignedTo != null) {
            p.setAssignedTo(assignedTo);
        }
        if (notes != null) {
            p.setNotes(ValidationUtil.sanitizeNullable(notes));
        }
        return repository.save(p);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Partner inquiry", id);
        }
        repository.deleteById(id);
    }
}
