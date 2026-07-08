package com.afroechub.controller.admin;

import com.afroechub.service.ActivityLogService;
import com.afroechub.service.StatsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@org.springframework.web.bind.annotation.RequestMapping("/admin")
public class AdminDashboardController {

    private final StatsService statsService;
    private final ActivityLogService activityLogService;
    private final AdminSupport support;

    public AdminDashboardController(StatsService statsService,
                                   ActivityLogService activityLogService,
                                   AdminSupport support) {
        this.statsService = statsService;
        this.activityLogService = activityLogService;
        this.support = support;
    }

    @GetMapping({"", "/", "/dashboard"})
    public String dashboard(Model model) {
        model.addAttribute("stats", statsService.dashboardStats());
        model.addAttribute("recentActivity", activityLogService.recent());
        model.addAttribute("currentUser", support.currentUsername());
        model.addAttribute("active", "dashboard");
        return "admin/dashboard";
    }
}
