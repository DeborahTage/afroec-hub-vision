package com.afroechub.controller.admin;

import com.afroechub.enums.ContactStatus;
import com.afroechub.service.ContactService;
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
@RequestMapping("/admin/contacts")
public class AdminContactController {

    private final ContactService contactService;
    private final AdminSupport support;

    public AdminContactController(ContactService contactService, AdminSupport support) {
        this.contactService = contactService;
        this.support = support;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q,
                       @RequestParam(required = false) ContactStatus status,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       Model model) {
        Page<?> result = contactService.search(q, status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        model.addAttribute("page", result);
        model.addAttribute("contacts", result.getContent());
        model.addAttribute("q", q);
        model.addAttribute("status", status);
        model.addAttribute("size", size);
        model.addAttribute("statuses", ContactStatus.values());
        model.addAttribute("active", "contacts");
        return "admin/contacts/list";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("contact", contactService.findById(id));
        model.addAttribute("statuses", ContactStatus.values());
        model.addAttribute("active", "contacts");
        return "admin/contacts/detail";
    }

    @PostMapping("/{id}/reply")
    public String reply(@PathVariable Long id,
                        @RequestParam String responseText,
                        HttpServletRequest request) {
        contactService.reply(id, responseText);
        support.audit(request, "UPDATE", "CONTACT", id, "Replied to contact submission");
        return "redirect:/admin/contacts/" + id;
    }

    @PostMapping("/{id}/status")
    public String updateStatus(@PathVariable Long id,
                               @RequestParam ContactStatus status,
                               HttpServletRequest request) {
        contactService.updateStatus(id, status);
        support.audit(request, "UPDATE", "CONTACT", id, "Updated status to " + status);
        return "redirect:/admin/contacts/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        contactService.delete(id);
        support.audit(request, "DELETE", "CONTACT", id, "Deleted contact submission");
        return "redirect:/admin/contacts";
    }
}
