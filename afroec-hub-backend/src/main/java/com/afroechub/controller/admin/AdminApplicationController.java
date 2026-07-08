package com.afroechub.controller.admin;

import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.ProgramType;
import com.afroechub.service.ApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/applications")
public class AdminApplicationController {

    private final ApplicationService applicationService;
    private final AdminSupport support;

    public AdminApplicationController(ApplicationService applicationService, AdminSupport support) {
        this.applicationService = applicationService;
        this.support = support;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q,
                       @RequestParam(required = false) ApplicationStatus status,
                       @RequestParam(required = false) ProgramType program,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       @RequestParam(defaultValue = "createdAt") String sort,
                       @RequestParam(defaultValue = "desc") String dir,
                       Model model) {
        Sort sortObj = Sort.by("asc".equalsIgnoreCase(dir) ? Sort.Direction.ASC : Sort.Direction.DESC, sort);
        Page<?> result = applicationService.search(q, status, program, PageRequest.of(page, size, sortObj));
        model.addAttribute("page", result);
        model.addAttribute("applications", result.getContent());
        model.addAttribute("q", q);
        model.addAttribute("status", status);
        model.addAttribute("program", program);
        model.addAttribute("size", size);
        model.addAttribute("sort", sort);
        model.addAttribute("dir", dir);
        model.addAttribute("statuses", ApplicationStatus.values());
        model.addAttribute("programs", ProgramType.values());
        model.addAttribute("active", "applications");
        return "admin/applications/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("app", applicationService.findById(id));
        model.addAttribute("statuses", ApplicationStatus.values());
        model.addAttribute("active", "applications");
        return "admin/applications/detail";
    }

    @PostMapping("/{id}/update")
    public String update(@PathVariable Long id,
                         @RequestParam(required = false) ApplicationStatus status,
                         @RequestParam(required = false) String notes,
                         HttpServletRequest request) {
        applicationService.updateStatus(id, status, notes);
        support.audit(request, "UPDATE", "APPLICATION", id,
                "Updated application status to " + status);
        return "redirect:/admin/applications/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        applicationService.delete(id);
        support.audit(request, "DELETE", "APPLICATION", id, "Deleted application");
        return "redirect:/admin/applications";
    }
}
