package com.afroechub.controller.admin;

import com.afroechub.service.ActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/activity")
public class AdminActivityController {

    private final ActivityLogService activityLogService;

    public AdminActivityController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @GetMapping
    public String list(@RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "25") int size,
                       Model model) {
        Page<?> result = activityLogService.findAll(PageRequest.of(page, size));
        model.addAttribute("page", result);
        model.addAttribute("logs", result.getContent());
        model.addAttribute("size", size);
        model.addAttribute("active", "activity");
        return "admin/activity/list";
    }
}
