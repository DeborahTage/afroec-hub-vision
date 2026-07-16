package com.afroechub.controller.admin;

import com.afroechub.dto.request.EventUpsertRequest;
import com.afroechub.enums.EventStatus;
import com.afroechub.service.EventService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalTime;

@Controller
@RequestMapping("/admin/events")
public class AdminEventController {

    private final EventService eventService;
    private final AdminSupport support;

    public AdminEventController(EventService eventService, AdminSupport support) {
        this.eventService = eventService;
        this.support = support;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("events", eventService.listAll());
        model.addAttribute("active", "events");
        return "admin/events/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("statuses", EventStatus.values());
        model.addAttribute("active", "events");
        return "admin/events/form";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("event", eventService.findById(id));
        model.addAttribute("registrations", eventService.registrations(id));
        model.addAttribute("statuses", EventStatus.values());
        model.addAttribute("active", "events");
        return "admin/events/detail";
    }

    @PostMapping
    public String create(@RequestParam String title,
                         @RequestParam(required = false) String slug,
                         @RequestParam(required = false) String description,
                         @RequestParam(required = false) String content,
                         @RequestParam(required = false) LocalDate eventDate,
                         @RequestParam(required = false) LocalTime eventTime,
                         @RequestParam(required = false) String location,
                         @RequestParam(required = false) String imageUrl,
                         @RequestParam(required = false) String category,
                         @RequestParam(required = false) EventStatus status,
                         @RequestParam(required = false, defaultValue = "false") Boolean published,
                         HttpServletRequest request) {
        var created = eventService.create(new EventUpsertRequest(
                title, slug, description, content, eventDate, eventTime, location,
                imageUrl, null, null, category, status, published));
        support.audit(request, "CREATE", "EVENT", created.getId(), "Created event");
        return "redirect:/admin/events/" + created.getId();
    }

    @PostMapping("/{id}/update")
    public String update(@PathVariable Long id,
                         @RequestParam String title,
                         @RequestParam(required = false) String slug,
                         @RequestParam(required = false) String description,
                         @RequestParam(required = false) String content,
                         @RequestParam(required = false) LocalDate eventDate,
                         @RequestParam(required = false) LocalTime eventTime,
                         @RequestParam(required = false) String location,
                         @RequestParam(required = false) String imageUrl,
                         @RequestParam(required = false) String category,
                         @RequestParam(required = false) EventStatus status,
                         @RequestParam(required = false, defaultValue = "false") Boolean published,
                         HttpServletRequest request) {
        eventService.update(id, new EventUpsertRequest(
                title, slug, description, content, eventDate, eventTime, location,
                imageUrl, null, null, category, status, published));
        support.audit(request, "UPDATE", "EVENT", id, "Updated event");
        return "redirect:/admin/events/" + id;
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable Long id, HttpServletRequest request) {
        eventService.delete(id);
        support.audit(request, "DELETE", "EVENT", id, "Deleted event");
        return "redirect:/admin/events";
    }
}
