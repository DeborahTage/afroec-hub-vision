package com.afroechub.controller.admin;

import com.afroechub.service.NewsletterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/newsletters")
public class AdminNewsletterController {

    private final NewsletterService newsletterService;

    public AdminNewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @GetMapping
    public String list(@RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "25") int size,
                       Model model) {
        Page<?> result = newsletterService.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "subscribedAt")));
        model.addAttribute("page", result);
        model.addAttribute("subscribers", result.getContent());
        model.addAttribute("size", size);
        model.addAttribute("active", "newsletters");
        return "admin/newsletters/list";
    }
}
