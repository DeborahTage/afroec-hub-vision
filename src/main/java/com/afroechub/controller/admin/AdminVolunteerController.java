package com.afroechub.controller.admin;

import com.afroechub.enums.VolunteerStatus;
import com.afroechub.service.VolunteerService;
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
@RequestMapping("/admin/volunteers")
public class AdminVolunteerController {

    private final VolunteerService volunteerService;
    private final AdminSupport support;

    public AdminVolunteerController(VolunteerService volunteerService, AdminSupport support) {
        this.volunteerService = volunteerService;
        this.support = support;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q,
                       @RequestParam(required = false) VolunteerStatus status,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       Model model) {
        Page<?> result = volunteerService.search(q, status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        model.addAttribute("page", result);
        model.addAttribute("volunteers", result.getContent());
        model.addAttribute("q", q);
        model.addAttribute("status", status);
        model.addAttribute("size", size);
        model.addAttribute("statuses", VolunteerStatus.values());
        model.addAttribute("active", "volunteers");
        return "admin/volunteers/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("volunteer", volunteerService.findById(id));
        model.addAttribute("statuses", VolunteerStatus.values());
        model.addAttribute("active", "volunteers");
        return "admin/volunteers/detail";
    }

    @PostMapping("/{id}/update")
    public String update(@PathVariable Long id,
                         @RequestParam(required = false) VolunteerStatus status,
                         @RequestParam(required = false, defaultValue = "false") Boolean onboarded,
                         @RequestParam(required = false) String notes,
                         HttpServletRequest request) {
        volunteerService.update(id, status, onboarded, notes);
        support.audit(request, "UPDATE", "VOLUNTEER", id, "Updated volunteer application");
        return "redirect:/admin/volunteers/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        volunteerService.delete(id);
        support.audit(request, "DELETE", "VOLUNTEER", id, "Deleted volunteer application");
        return "redirect:/admin/volunteers";
    }
}
