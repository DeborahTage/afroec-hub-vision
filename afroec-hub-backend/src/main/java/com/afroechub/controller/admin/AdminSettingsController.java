package com.afroechub.controller.admin;

import com.afroechub.service.AdminUserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin/settings")
public class AdminSettingsController {

    private final AdminUserService adminUserService;
    private final AdminSupport support;

    public AdminSettingsController(AdminUserService adminUserService, AdminSupport support) {
        this.adminUserService = adminUserService;
        this.support = support;
    }

    @GetMapping
    public String profile(Model model) {
        model.addAttribute("admin", support.currentAdmin());
        model.addAttribute("active", "settings");
        return "admin/settings/profile";
    }

    @PostMapping("/profile")
    public String updateProfile(@RequestParam(required = false) String fullName,
                                @RequestParam(required = false) String email,
                                RedirectAttributes ra) {
        adminUserService.updateProfile(support.currentUsername(), fullName, email);
        ra.addFlashAttribute("success", "Profile updated");
        return "redirect:/admin/settings";
    }

    @PostMapping("/password")
    public String changePassword(@RequestParam String currentPassword,
                                 @RequestParam String newPassword,
                                 HttpServletRequest request,
                                 RedirectAttributes ra) {
        try {
            adminUserService.changePassword(support.currentUsername(), currentPassword, newPassword);
            support.audit(request, "UPDATE", "ADMIN", null, "Changed password");
            ra.addFlashAttribute("success", "Password changed successfully");
        } catch (RuntimeException ex) {
            ra.addFlashAttribute("error", ex.getMessage());
        }
        return "redirect:/admin/settings";
    }
}
