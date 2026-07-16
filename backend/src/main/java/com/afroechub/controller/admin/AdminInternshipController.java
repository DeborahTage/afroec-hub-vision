package com.afroechub.controller.admin;

import com.afroechub.enums.InternshipStatus;
import com.afroechub.service.InternshipService;
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
@RequestMapping("/admin/internships")
public class AdminInternshipController {

    private final InternshipService internshipService;
    private final AdminSupport support;

    public AdminInternshipController(InternshipService internshipService, AdminSupport support) {
        this.internshipService = internshipService;
        this.support = support;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q,
                       @RequestParam(required = false) InternshipStatus status,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       Model model) {
        Page<?> result = internshipService.search(q, status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        model.addAttribute("page", result);
        model.addAttribute("items", result.getContent());
        model.addAttribute("q", q);
        model.addAttribute("status", status);
        model.addAttribute("size", size);
        model.addAttribute("statuses", InternshipStatus.values());
        model.addAttribute("active", "internships");
        return "admin/internships/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("item", internshipService.findById(id));
        model.addAttribute("statuses", InternshipStatus.values());
        model.addAttribute("active", "internships");
        return "admin/internships/detail";
    }

    @PostMapping("/{id}/update")
    public String update(@PathVariable Long id,
                         @RequestParam(required = false) InternshipStatus status,
                         @RequestParam(required = false) String notes,
                         HttpServletRequest request) {
        internshipService.updateStatus(id, status, notes);
        support.audit(request, "UPDATE", "INTERNSHIP", id, "Updated internship application");
        return "redirect:/admin/internships/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        internshipService.delete(id);
        support.audit(request, "DELETE", "INTERNSHIP", id, "Deleted internship application");
        return "redirect:/admin/internships";
    }
}
