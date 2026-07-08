package com.afroechub.controller.admin;

import com.afroechub.entity.ContactSubmission;
import com.afroechub.entity.NewsletterSubscriber;
import com.afroechub.entity.PartnerInquiry;
import com.afroechub.entity.StudentApplication;
import com.afroechub.entity.VolunteerApplication;
import com.afroechub.service.ApplicationService;
import com.afroechub.service.ContactService;
import com.afroechub.service.NewsletterService;
import com.afroechub.service.PartnerService;
import com.afroechub.service.VolunteerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Controller
@RequestMapping("/admin/export")
public class AdminExportController {

    private final ApplicationService applicationService;
    private final PartnerService partnerService;
    private final VolunteerService volunteerService;
    private final ContactService contactService;
    private final NewsletterService newsletterService;
    private final AdminSupport support;

    public AdminExportController(ApplicationService applicationService,
                                PartnerService partnerService,
                                VolunteerService volunteerService,
                                ContactService contactService,
                                NewsletterService newsletterService,
                                AdminSupport support) {
        this.applicationService = applicationService;
        this.partnerService = partnerService;
        this.volunteerService = volunteerService;
        this.contactService = contactService;
        this.newsletterService = newsletterService;
        this.support = support;
    }

    @GetMapping("/{type}")
    public void export(@PathVariable String type,
                       HttpServletRequest request,
                       HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition",
                "attachment; filename=\"" + type + "-export.csv\"");
        PrintWriter writer = response.getWriter();

        switch (type) {
            case "applications" -> exportApplications(writer);
            case "partners" -> exportPartners(writer);
            case "volunteers" -> exportVolunteers(writer);
            case "contacts" -> exportContacts(writer);
            case "newsletters" -> exportNewsletters(writer);
            default -> writer.println("Unknown export type");
        }
        support.audit(request, "EXPORT", type.toUpperCase(), null, "Exported " + type + " to CSV");
        writer.flush();
    }

    private void exportApplications(PrintWriter w) {
        w.println("id,fullName,email,phone,city,programType,academyTrack,communityProgram,status,createdAt");
        List<StudentApplication> list = applicationService
                .search(null, null, null, Pageable.unpaged()).getContent();
        for (StudentApplication a : list) {
            w.println(String.join(",",
                    csv(a.getId()), csv(a.getFullName()), csv(a.getEmail()), csv(a.getPhone()),
                    csv(a.getCity()), csv(a.getProgramType()), csv(a.getAcademyTrack()),
                    csv(a.getCommunityProgram()), csv(a.getStatus()), csv(a.getCreatedAt())));
        }
    }

    private void exportPartners(PrintWriter w) {
        w.println("id,organizationName,contactPerson,email,phone,organizationType,status,createdAt");
        List<PartnerInquiry> list = partnerService.search(null, null, Pageable.unpaged()).getContent();
        for (PartnerInquiry p : list) {
            w.println(String.join(",",
                    csv(p.getId()), csv(p.getOrganizationName()), csv(p.getContactPerson()),
                    csv(p.getEmail()), csv(p.getPhone()), csv(p.getOrganizationType()),
                    csv(p.getStatus()), csv(p.getCreatedAt())));
        }
    }

    private void exportVolunteers(PrintWriter w) {
        w.println("id,fullName,email,phone,city,primaryRole,availability,status,onboarded,createdAt");
        List<VolunteerApplication> list = volunteerService.search(null, null, Pageable.unpaged()).getContent();
        for (VolunteerApplication v : list) {
            w.println(String.join(",",
                    csv(v.getId()), csv(v.getFullName()), csv(v.getEmail()), csv(v.getPhone()),
                    csv(v.getCity()), csv(v.getPrimaryRole()), csv(v.getAvailability()),
                    csv(v.getStatus()), csv(v.getOnboarded()), csv(v.getCreatedAt())));
        }
    }

    private void exportContacts(PrintWriter w) {
        w.println("id,name,email,phone,subject,status,responded,createdAt");
        List<ContactSubmission> list = contactService.search(null, null, Pageable.unpaged()).getContent();
        for (ContactSubmission c : list) {
            w.println(String.join(",",
                    csv(c.getId()), csv(c.getName()), csv(c.getEmail()), csv(c.getPhone()),
                    csv(c.getSubject()), csv(c.getStatus()), csv(c.getResponded()), csv(c.getCreatedAt())));
        }
    }

    private void exportNewsletters(PrintWriter w) {
        w.println("id,email,active,subscribedAt,unsubscribedAt");
        List<NewsletterSubscriber> list = newsletterService.findAll(Pageable.unpaged()).getContent();
        for (NewsletterSubscriber s : list) {
            w.println(String.join(",",
                    csv(s.getId()), csv(s.getEmail()), csv(s.getActive()),
                    csv(s.getSubscribedAt()), csv(s.getUnsubscribedAt())));
        }
    }

    private String csv(Object value) {
        if (value == null) {
            return "";
        }
        String s = value.toString().replace("\"", "\"\"");
        if (s.contains(",") || s.contains("\n") || s.contains("\"")) {
            return "\"" + s + "\"";
        }
        return s;
    }
}
