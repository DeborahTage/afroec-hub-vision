package com.afroechub.controller.admin;

import com.afroechub.enums.AmbassadorStatus;
import com.afroechub.service.AmbassadorService;
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
@RequestMapping("/admin/ambassadors")
public class AdminAmbassadorController {

    private final AmbassadorService ambassadorService;
    private final AdminSupport support;

    public AdminAmbassadorController(AmbassadorService ambassadorService, AdminSupport support) {
        this.ambassadorService = ambassadorService;
        this.support = support;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q,
                       @RequestParam(required = false) AmbassadorStatus status,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       Model model) {
        Page<?> result = ambassadorService.search(q, status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        model.addAttribute("page", result);
        model.addAttribute("items", result.getContent());
        model.addAttribute("q", q);
        model.addAttribute("status", status);
        model.addAttribute("size", size);
        model.addAttribute("statuses", AmbassadorStatus.values());
        model.addAttribute("active", "ambassadors");
        return "admin/ambassadors/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("item", ambassadorService.findById(id));
        model.addAttribute("statuses", AmbassadorStatus.values());
        model.addAttribute("active", "ambassadors");
        return "admin/ambassadors/detail";
    }

    @PostMapping("/{id}/update")
    public String update(@PathVariable Long id,
                         @RequestParam(required = false) AmbassadorStatus status,
                         @RequestParam(required = false) String notes,
                         HttpServletRequest request) {
        ambassadorService.updateStatus(id, status, notes);
        support.audit(request, "UPDATE", "AMBASSADOR", id, "Updated ambassador application");
        return "redirect:/admin/ambassadors/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        ambassadorService.delete(id);
        support.audit(request, "DELETE", "AMBASSADOR", id, "Deleted ambassador application");
        return "redirect:/admin/ambassadors";
    }
}
