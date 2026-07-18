package com.afroechub.controller.admin;

import com.afroechub.service.AnalyticsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/analytics")
public class AdminAnalyticsController {

    private final AnalyticsService analyticsService;

    public AdminAnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public String overview(Model model) {
        model.addAttribute("stats", analyticsService.overview());
        model.addAttribute("active", "analytics");
        return "admin/analytics/overview";
    }
}
