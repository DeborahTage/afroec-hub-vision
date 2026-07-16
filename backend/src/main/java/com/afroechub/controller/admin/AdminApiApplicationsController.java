package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.repository.AmbassadorApplicationRepository;
import com.afroechub.repository.InternshipApplicationRepository;
import com.afroechub.repository.PartnerInquiryRepository;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/applications")
public class AdminApiApplicationsController {
    private final PartnerInquiryRepository partners;
    private final AmbassadorApplicationRepository ambassadors;
    private final VolunteerApplicationRepository volunteers;
    private final InternshipApplicationRepository internships;

    public AdminApiApplicationsController(PartnerInquiryRepository partners, AmbassadorApplicationRepository ambassadors,
                                          VolunteerApplicationRepository volunteers, InternshipApplicationRepository internships) {
        this.partners = partners; this.ambassadors = ambassadors; this.volunteers = volunteers; this.internships = internships;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> list(@RequestParam(required = false) String type,
                                                                       @RequestParam(defaultValue = "50") int limit) {
        var pageable = PageRequest.of(0, Math.min(Math.max(limit, 1), 100), Sort.by(Sort.Direction.DESC, "createdAt"));
        List<Map<String, Object>> rows = new ArrayList<>();
        if (type == null || type.isBlank() || type.equalsIgnoreCase("PARTNER")) partners.findAll(pageable).forEach(p -> rows.add(Map.of("id", p.getId(), "type", "PARTNER", "fullName", p.getOrganizationName(), "email", p.getEmail(), "phone", p.getPhone() == null ? "" : p.getPhone(), "status", p.getStatus().name(), "createdAt", p.getCreatedAt())));
        if (type == null || type.isBlank() || type.equalsIgnoreCase("AMBASSADOR")) ambassadors.findAll(pageable).forEach(a -> rows.add(Map.of("id", a.getId(), "type", "AMBASSADOR", "fullName", a.getFullName(), "email", a.getEmail(), "phone", a.getPhone() == null ? "" : a.getPhone(), "status", a.getStatus().name(), "createdAt", a.getCreatedAt())));
        if (type == null || type.isBlank() || type.equalsIgnoreCase("VOLUNTEER")) volunteers.findAll(pageable).forEach(v -> rows.add(Map.of("id", v.getId(), "type", "VOLUNTEER", "fullName", v.getFullName(), "email", v.getEmail(), "phone", v.getPhone() == null ? "" : v.getPhone(), "status", v.getStatus().name(), "createdAt", v.getCreatedAt())));
        if (type == null || type.isBlank() || type.equalsIgnoreCase("INTERNSHIP")) internships.findAll(pageable).forEach(i -> rows.add(Map.of("id", i.getId(), "type", "INTERNSHIP", "fullName", i.getFullName(), "email", i.getEmail(), "phone", i.getPhone() == null ? "" : i.getPhone(), "status", i.getStatus().name(), "createdAt", i.getCreatedAt())));
        rows.sort(Comparator.comparing(r -> String.valueOf(r.get("createdAt")), Comparator.reverseOrder()));
        return ResponseEntity.ok(ApiResponse.ok("OK", rows));
    }
}
