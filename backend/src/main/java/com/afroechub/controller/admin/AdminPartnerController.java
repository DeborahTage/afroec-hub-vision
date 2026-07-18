package com.afroechub.controller.admin;

import com.afroechub.enums.PartnerStatus;
import com.afroechub.service.PartnerService;
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
@RequestMapping("/admin/partners")
public class AdminPartnerController {

    private final PartnerService partnerService;
    private final AdminSupport support;

    public AdminPartnerController(PartnerService partnerService, AdminSupport support) {
        this.partnerService = partnerService;
        this.support = support;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q,
                       @RequestParam(required = false) PartnerStatus status,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       Model model) {
        Page<?> result = partnerService.search(q, status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        model.addAttribute("page", result);
        model.addAttribute("partners", result.getContent());
        model.addAttribute("q", q);
        model.addAttribute("status", status);
        model.addAttribute("size", size);
        model.addAttribute("statuses", PartnerStatus.values());
        model.addAttribute("active", "partners");
        return "admin/partners/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("partner", partnerService.findById(id));
        model.addAttribute("statuses", PartnerStatus.values());
        model.addAttribute("active", "partners");
        return "admin/partners/detail";
    }

    @PostMapping("/{id}/update")
    public String update(@PathVariable Long id,
                         @RequestParam(required = false) PartnerStatus status,
                         @RequestParam(required = false) String assignedTo,
                         @RequestParam(required = false) String notes,
                         HttpServletRequest request) {
        partnerService.update(id, status, assignedTo, notes);
        support.audit(request, "UPDATE", "PARTNER", id, "Updated partner inquiry");
        return "redirect:/admin/partners/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        partnerService.delete(id);
        support.audit(request, "DELETE", "PARTNER", id, "Deleted partner inquiry");
        return "redirect:/admin/partners";
    }
}
