package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.repository.AmbassadorApplicationRepository;
import com.afroechub.repository.InternshipApplicationRepository;
import com.afroechub.repository.PartnerInquiryRepository;
import com.afroechub.repository.StudentApplicationRepository;
import com.afroechub.repository.VolunteerApplicationRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/admin/applications")
public class AdminApiApplicationsController {
    private final PartnerInquiryRepository partners;
    private final AmbassadorApplicationRepository ambassadors;
    private final VolunteerApplicationRepository volunteers;
    private final InternshipApplicationRepository internships;
    private final StudentApplicationRepository students;

    public AdminApiApplicationsController(PartnerInquiryRepository partners,
                                          AmbassadorApplicationRepository ambassadors,
                                          VolunteerApplicationRepository volunteers,
                                          InternshipApplicationRepository internships,
                                          StudentApplicationRepository students) {
        this.partners = partners;
        this.ambassadors = ambassadors;
        this.volunteers = volunteers;
        this.internships = internships;
        this.students = students;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> list(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "100") int limit) {
        var pageable = PageRequest.of(0, Math.min(Math.max(limit, 1), 200),
                Sort.by(Sort.Direction.DESC, "createdAt"));
        String typeFilter = type == null ? "" : type.trim().toUpperCase(Locale.ROOT);
        String statusFilter = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);

        List<Map<String, Object>> rows = new ArrayList<>();

        if (include(typeFilter, "PARTNER")) {
            partners.findAll(pageable).forEach(p -> rows.add(row(
                    p.getId(), "PARTNER",
                    p.getOrganizationName(),
                    p.getContactPerson(),
                    p.getEmail(),
                    p.getPhone(),
                    p.getStatus() == null ? null : p.getStatus().name(),
                    p.getCreatedAt())));
        }
        if (include(typeFilter, "AMBASSADOR")) {
            ambassadors.findAll(pageable).forEach(a -> rows.add(row(
                    a.getId(), "AMBASSADOR",
                    a.getFullName(),
                    null,
                    a.getEmail(),
                    a.getPhone(),
                    a.getStatus() == null ? null : a.getStatus().name(),
                    a.getCreatedAt())));
        }
        if (include(typeFilter, "VOLUNTEER")) {
            volunteers.findAll(pageable).forEach(v -> rows.add(row(
                    v.getId(), "VOLUNTEER",
                    v.getFullName(),
                    null,
                    v.getEmail(),
                    v.getPhone(),
                    v.getStatus() == null ? null : v.getStatus().name(),
                    v.getCreatedAt())));
        }
        if (include(typeFilter, "INTERNSHIP")) {
            internships.findAll(pageable).forEach(i -> rows.add(row(
                    i.getId(), "INTERNSHIP",
                    i.getFullName(),
                    null,
                    i.getEmail(),
                    i.getPhone(),
                    i.getStatus() == null ? null : i.getStatus().name(),
                    i.getCreatedAt())));
        }
        if (include(typeFilter, "STUDENT")) {
            students.findAll(pageable).forEach(s -> rows.add(row(
                    s.getId(), "STUDENT",
                    s.getFullName(),
                    s.getProgramType() == null ? null : s.getProgramType().name(),
                    s.getEmail(),
                    s.getPhone(),
                    s.getStatus() == null ? null : s.getStatus().name(),
                    s.getCreatedAt())));
        }

        if (!statusFilter.isBlank()) {
            rows.removeIf(r -> !statusFilter.equalsIgnoreCase(String.valueOf(r.get("status"))));
        }

        rows.sort(Comparator.comparing(
                (Map<String, Object> r) -> String.valueOf(r.get("createdAt")),
                Comparator.nullsLast(Comparator.reverseOrder())));

        return ResponseEntity.ok(ApiResponse.ok("OK", rows));
    }

    private static boolean include(String typeFilter, String type) {
        return typeFilter.isBlank() || typeFilter.equals(type);
    }

    private static Map<String, Object> row(Long id, String type, String fullName, String secondary,
                                           String email, String phone, String status, Object createdAt) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", id == null ? 0L : id);
        map.put("type", type);
        map.put("fullName", Objects.toString(fullName, ""));
        map.put("secondary", Objects.toString(secondary, ""));
        map.put("email", Objects.toString(email, ""));
        map.put("phone", Objects.toString(phone, ""));
        map.put("status", Objects.toString(status, "PENDING"));
        map.put("createdAt", createdAt == null ? "" : createdAt.toString());
        return map;
    }
}
