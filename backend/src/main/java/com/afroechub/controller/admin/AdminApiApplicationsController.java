package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.AmbassadorApplication;
import com.afroechub.entity.InternshipApplication;
import com.afroechub.entity.PartnerInquiry;
import com.afroechub.entity.StudentApplication;
import com.afroechub.entity.VolunteerApplication;
import com.afroechub.enums.AmbassadorStatus;
import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.InternshipStatus;
import com.afroechub.enums.PartnerStatus;
import com.afroechub.enums.VolunteerStatus;
import com.afroechub.exception.InvalidRequestException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.AmbassadorApplicationRepository;
import com.afroechub.repository.InternshipApplicationRepository;
import com.afroechub.repository.PartnerInquiryRepository;
import com.afroechub.repository.StudentApplicationRepository;
import com.afroechub.repository.VolunteerApplicationRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
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
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> list(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "100") int limit) {
        List<Map<String, Object>> rows = collect(type, status, limit);
        return ResponseEntity.ok(ApiResponse.ok("OK", rows));
    }

    @GetMapping("/{type}/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<Map<String, Object>>> detail(@PathVariable String type,
                                                                   @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("OK", detailOf(normalizeType(type), id)));
    }

    @PutMapping("/{type}/{id}/status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateStatus(@PathVariable String type,
                                                                         @PathVariable Long id,
                                                                         @RequestBody Map<String, String> body) {
        String status = body == null ? null : body.get("status");
        if (status == null || status.isBlank()) {
            throw new InvalidRequestException("Status is required.");
        }
        String normalized = normalizeType(type);
        applyStatus(normalized, id, status.trim().toUpperCase(Locale.ROOT));
        return ResponseEntity.ok(ApiResponse.ok("Status updated", detailOf(normalized, id)));
    }

    @DeleteMapping("/{type}/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String type, @PathVariable Long id) {
        String normalized = normalizeType(type);
        switch (normalized) {
            case "PARTNER" -> partners.delete(partners.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Partner inquiry not found")));
            case "AMBASSADOR" -> ambassadors.delete(ambassadors.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Ambassador application not found")));
            case "VOLUNTEER" -> volunteers.delete(volunteers.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Volunteer application not found")));
            case "INTERNSHIP" -> internships.delete(internships.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Internship application not found")));
            case "STUDENT" -> students.delete(students.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Student application not found")));
            default -> throw new InvalidRequestException("Unknown application type.");
        }
        return ResponseEntity.ok(ApiResponse.ok("Deleted"));
    }

    @GetMapping(value = "/export.csv", produces = "text/csv")
    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> exportCsv(@RequestParam(required = false) String type,
                                            @RequestParam(required = false) String status) {
        List<Map<String, Object>> rows = collect(type, status, 500);
        StringBuilder csv = new StringBuilder("id,type,fullName,email,phone,status,secondary,createdAt\n");
        for (Map<String, Object> row : rows) {
            csv.append(csv(row.get("id"))).append(',')
                    .append(csv(row.get("type"))).append(',')
                    .append(csv(row.get("fullName"))).append(',')
                    .append(csv(row.get("email"))).append(',')
                    .append(csv(row.get("phone"))).append(',')
                    .append(csv(row.get("status"))).append(',')
                    .append(csv(row.get("secondary"))).append(',')
                    .append(csv(row.get("createdAt"))).append('\n');
        }
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"applications-export.csv\"")
                .contentType(new MediaType("text", "csv", StandardCharsets.UTF_8))
                .body(bytes);
    }

    private List<Map<String, Object>> collect(String type, String status, int limit) {
        var pageable = PageRequest.of(0, Math.min(Math.max(limit, 1), 500),
                Sort.by(Sort.Direction.DESC, "createdAt"));
        String typeFilter = type == null ? "" : type.trim().toUpperCase(Locale.ROOT);
        String statusFilter = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
        List<Map<String, Object>> rows = new ArrayList<>();

        if (include(typeFilter, "PARTNER")) {
            partners.findAll(pageable).forEach(p -> rows.add(partnerDetail(p)));
        }
        if (include(typeFilter, "AMBASSADOR")) {
            ambassadors.findAll(pageable).forEach(a -> rows.add(ambassadorDetail(a)));
        }
        if (include(typeFilter, "VOLUNTEER")) {
            volunteers.findAll(pageable).forEach(v -> rows.add(volunteerDetail(v)));
        }
        if (include(typeFilter, "INTERNSHIP")) {
            internships.findAll(pageable).forEach(i -> rows.add(internshipDetail(i)));
        }
        if (include(typeFilter, "STUDENT")) {
            students.findAll(pageable).forEach(s -> rows.add(studentDetail(s)));
        }

        if (!statusFilter.isBlank()) {
            rows.removeIf(r -> !statusFilter.equalsIgnoreCase(String.valueOf(r.get("status"))));
        }
        rows.sort(Comparator.comparing(
                (Map<String, Object> r) -> String.valueOf(r.get("createdAt")),
                Comparator.nullsLast(Comparator.reverseOrder())));
        return rows;
    }

    private Map<String, Object> detailOf(String type, Long id) {
        return switch (type) {
            case "PARTNER" -> partnerDetail(partners.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Partner inquiry not found")));
            case "AMBASSADOR" -> ambassadorDetail(ambassadors.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Ambassador application not found")));
            case "VOLUNTEER" -> volunteerDetail(volunteers.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Volunteer application not found")));
            case "INTERNSHIP" -> internshipDetail(internships.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Internship application not found")));
            case "STUDENT" -> studentDetail(students.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Student application not found")));
            default -> throw new InvalidRequestException("Unknown application type.");
        };
    }

    private void applyStatus(String type, Long id, String status) {
        switch (type) {
            case "PARTNER" -> {
                PartnerInquiry entity = partners.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Partner inquiry not found"));
                entity.setStatus(parseEnum(PartnerStatus.class, status));
                partners.save(entity);
            }
            case "AMBASSADOR" -> {
                AmbassadorApplication entity = ambassadors.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Ambassador application not found"));
                entity.setStatus(parseEnum(AmbassadorStatus.class, status));
                ambassadors.save(entity);
            }
            case "VOLUNTEER" -> {
                VolunteerApplication entity = volunteers.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Volunteer application not found"));
                entity.setStatus(parseEnum(VolunteerStatus.class, status));
                volunteers.save(entity);
            }
            case "INTERNSHIP" -> {
                InternshipApplication entity = internships.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Internship application not found"));
                entity.setStatus(parseEnum(InternshipStatus.class, status));
                internships.save(entity);
            }
            case "STUDENT" -> {
                StudentApplication entity = students.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Student application not found"));
                entity.setStatus(parseEnum(ApplicationStatus.class, status));
                students.save(entity);
            }
            default -> throw new InvalidRequestException("Unknown application type.");
        }
    }

    private Map<String, Object> partnerDetail(PartnerInquiry p) {
        Map<String, Object> map = summary(p.getId(), "PARTNER", p.getOrganizationName(), p.getContactPerson(),
                p.getEmail(), p.getPhone(), p.getStatus() == null ? null : p.getStatus().name(), p.getCreatedAt());
        map.put("organizationName", p.getOrganizationName());
        map.put("contactPerson", p.getContactPerson());
        map.put("organizationType", enumName(p.getOrganizationType()));
        map.put("partnershipInterest", copyList(p.getPartnershipInterest()));
        map.put("message", p.getMessage());
        map.put("assignedTo", p.getAssignedTo());
        map.put("followUpDate", p.getFollowUpDate());
        map.put("notes", p.getNotes());
        map.put("updatedAt", p.getUpdatedAt());
        return map;
    }

    private Map<String, Object> ambassadorDetail(AmbassadorApplication a) {
        Map<String, Object> map = summary(a.getId(), "AMBASSADOR", a.getFullName(), a.getInstitutionName(),
                a.getEmail(), a.getPhone(), a.getStatus() == null ? null : a.getStatus().name(), a.getCreatedAt());
        map.put("dateOfBirth", a.getDateOfBirth());
        map.put("gender", enumName(a.getGender()));
        map.put("city", a.getCity());
        map.put("institutionName", a.getInstitutionName());
        map.put("institutionType", enumName(a.getInstitutionType()));
        map.put("gradeLevel", a.getGradeLevel());
        map.put("fieldOfStudy", a.getFieldOfStudy());
        map.put("motivationLetter", a.getMotivationLetter());
        map.put("leadershipExperience", a.getLeadershipExperience());
        map.put("techSkills", a.getTechSkills());
        map.put("proposedClubName", a.getProposedClubName());
        map.put("hoursPerWeek", a.getHoursPerWeek());
        map.put("estimatedMembers", a.getEstimatedMembers());
        map.put("supportNeeded", a.getSupportNeeded());
        map.put("cvUrl", a.getCvUrl());
        map.put("recommendationLetterUrl", a.getRecommendationLetterUrl());
        map.put("portfolioUrl", a.getPortfolioUrl());
        map.put("commitHours", a.getCommitHours());
        map.put("commitClub", a.getCommitClub());
        map.put("commitBootcamp", a.getCommitBootcamp());
        map.put("agreeConduct", a.getAgreeConduct());
        map.put("notes", a.getNotes());
        map.put("updatedAt", a.getUpdatedAt());
        return map;
    }

    private Map<String, Object> volunteerDetail(VolunteerApplication v) {
        Map<String, Object> map = summary(v.getId(), "VOLUNTEER", v.getFullName(),
                v.getPrimaryRole() == null ? null : v.getPrimaryRole().name(),
                v.getEmail(), v.getPhone(), v.getStatus() == null ? null : v.getStatus().name(), v.getCreatedAt());
        map.put("telegram", v.getTelegram());
        map.put("city", v.getCity());
        map.put("primaryRole", enumName(v.getPrimaryRole()));
        map.put("secondaryRole", enumName(v.getSecondaryRole()));
        map.put("availability", enumName(v.getAvailability()));
        map.put("skills", copyList(v.getSkills()));
        map.put("languages", copyList(v.getLanguages()));
        map.put("motivation", v.getMotivation());
        map.put("professionalBackground", v.getProfessionalBackground());
        map.put("hoursPerWeek", v.getHoursPerWeek());
        map.put("startDate", v.getStartDate());
        map.put("commitmentDuration", enumName(v.getCommitmentDuration()));
        map.put("experienceLevel", enumName(v.getExperienceLevel()));
        map.put("portfolioLink", v.getPortfolioLink());
        map.put("resumeLink", v.getResumeLink());
        map.put("referencesContact", v.getReferencesContact());
        map.put("onboarded", v.getOnboarded());
        map.put("notes", v.getNotes());
        map.put("updatedAt", v.getUpdatedAt());
        return map;
    }

    private Map<String, Object> internshipDetail(InternshipApplication i) {
        Map<String, Object> map = summary(i.getId(), "INTERNSHIP", i.getFullName(), i.getInstitution(),
                i.getEmail(), i.getPhone(), i.getStatus() == null ? null : i.getStatus().name(), i.getCreatedAt());
        map.put("linkedinUrl", i.getLinkedinUrl());
        map.put("institutionName", i.getInstitution());
        map.put("fieldOfStudy", i.getFieldOfStudy());
        map.put("yearOfStudy", i.getYearOfStudy());
        map.put("graduationDate", i.getGraduationDate());
        map.put("department", enumName(i.getDepartment()));
        map.put("duration", enumName(i.getDuration()));
        map.put("startDate", i.getStartDate());
        map.put("fullTime", i.getFullTime());
        map.put("skills", i.getSkills());
        map.put("experience", i.getExperience());
        map.put("projectLinks", i.getProjectLinks());
        map.put("motivationAfroec", i.getMotivationAfroec());
        map.put("learningGoals", i.getLearningGoals());
        map.put("cvUrl", i.getCvUrl());
        map.put("githubUrl", i.getGithubUrl());
        map.put("coverLetterUrl", i.getCoverLetterUrl());
        map.put("transcriptUrl", i.getTranscriptUrl());
        map.put("agreeUnpaid", i.getAgreeUnpaid());
        map.put("agreeDuration", i.getAgreeDuration());
        map.put("agreePolicies", i.getAgreePolicies());
        map.put("notes", i.getNotes());
        map.put("updatedAt", i.getUpdatedAt());
        return map;
    }

    private Map<String, Object> studentDetail(StudentApplication s) {
        Map<String, Object> map = summary(s.getId(), "STUDENT", s.getFullName(),
                s.getProgramType() == null ? null : s.getProgramType().name(),
                s.getEmail(), s.getPhone(), s.getStatus() == null ? null : s.getStatus().name(), s.getCreatedAt());
        map.put("telegram", s.getTelegram());
        map.put("city", s.getCity());
        map.put("dateOfBirth", s.getDateOfBirth());
        map.put("gender", enumName(s.getGender()));
        map.put("programType", enumName(s.getProgramType()));
        map.put("academyTrack", enumName(s.getAcademyTrack()));
        map.put("communityProgram", enumName(s.getCommunityProgram()));
        map.put("educationLevel", enumName(s.getEducationLevel()));
        map.put("employmentStatus", enumName(s.getEmploymentStatus()));
        map.put("priorExperience", s.getPriorExperience());
        map.put("motivation", s.getMotivation());
        map.put("careerGoals", s.getCareerGoals());
        map.put("githubPortfolio", s.getGithubPortfolio());
        map.put("incomeShareAgreement", s.getIncomeShareAgreement());
        map.put("howDidYouHear", s.getHowDidYouHear());
        map.put("availability", enumName(s.getAvailability()));
        map.put("preferredStartDate", s.getPreferredStartDate());
        map.put("canCommitFulltime", s.getCanCommitFulltime());
        map.put("notes", s.getNotes());
        map.put("updatedAt", s.getUpdatedAt());
        return map;
    }

    private static boolean include(String typeFilter, String type) {
        return typeFilter.isBlank() || typeFilter.equals(type);
    }

    private static String normalizeType(String type) {
        if (type == null || type.isBlank()) {
            throw new InvalidRequestException("Application type is required.");
        }
        return type.trim().toUpperCase(Locale.ROOT);
    }

    private static Map<String, Object> summary(Long id, String type, String fullName, String secondary,
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

    private static String enumName(Enum<?> value) {
        return value == null ? "" : value.name();
    }

    private static List<String> copyList(List<String> values) {
        if (values == null || values.isEmpty()) {
            return List.of();
        }
        return List.copyOf(values);
    }

    private static <E extends Enum<E>> E parseEnum(Class<E> type, String value) {
        try {
            return Enum.valueOf(type, value);
        } catch (Exception ex) {
            throw new InvalidRequestException("Invalid status for this application type.");
        }
    }

    private static String csv(Object value) {
        String text = value == null ? "" : String.valueOf(value);
        if (text.contains(",") || text.contains("\"") || text.contains("\n")) {
            return "\"" + text.replace("\"", "\"\"") + "\"";
        }
        return text;
    }
}
