package com.afroechub.controller.admin;

import com.afroechub.entity.AdminUser;
import com.afroechub.service.ActivityLogService;
import com.afroechub.service.AdminUserService;
import com.afroechub.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Shared helpers for admin MVC controllers: resolving the current admin and
 * writing audit log entries.
 */
@Component
public class AdminSupport {

    private final AdminUserService adminUserService;
    private final ActivityLogService activityLogService;

    public AdminSupport(AdminUserService adminUserService, ActivityLogService activityLogService) {
        this.adminUserService = adminUserService;
        this.activityLogService = activityLogService;
    }

    public AdminUser currentAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            return null;
        }
        return adminUserService.findByUsername(auth.getName());
    }

    public String currentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : "unknown";
    }

    public void audit(HttpServletRequest request, String action, String entityType,
                      Long entityId, String details) {
        AdminUser admin = currentAdmin();
        Long adminId = admin != null ? admin.getId() : null;
        activityLogService.log(adminId, action, entityType, entityId, details, JwtUtil.clientIp(request));
    }
}
