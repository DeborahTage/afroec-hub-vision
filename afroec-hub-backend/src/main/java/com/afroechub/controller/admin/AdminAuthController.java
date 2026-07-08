package com.afroechub.controller.admin;

import com.afroechub.config.JwtTokenProvider;
import com.afroechub.dto.request.AdminLoginRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.AdminUser;
import com.afroechub.exception.UnauthorizedException;
import com.afroechub.service.ActivityLogService;
import com.afroechub.service.AdminUserService;
import com.afroechub.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminAuthController {

    private final AdminUserService adminUserService;
    private final JwtTokenProvider tokenProvider;
    private final ActivityLogService activityLogService;

    public AdminAuthController(AdminUserService adminUserService,
                              JwtTokenProvider tokenProvider,
                              ActivityLogService activityLogService) {
        this.adminUserService = adminUserService;
        this.tokenProvider = tokenProvider;
        this.activityLogService = activityLogService;
    }

    @GetMapping("/admin/login")
    public String loginPage(Model model) {
        return "admin/login";
    }

    @PostMapping("/admin/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        HttpServletRequest request,
                        HttpServletResponse response,
                        Model model) {
        try {
            AdminUser user = adminUserService.authenticate(username, password);
            issueCookie(response, user);
            activityLogService.log(user.getId(), "LOGIN", "ADMIN", user.getId(),
                    "Admin logged in", JwtUtil.clientIp(request));
            return "redirect:/admin/dashboard";
        } catch (UnauthorizedException ex) {
            model.addAttribute("error", ex.getMessage());
            return "admin/login";
        }
    }

    @PostMapping("/admin/api/auth/login")
    @ResponseBody
    public ResponseEntity<ApiResponse<TokenResponse>> apiLogin(
            @Valid @RequestBody AdminLoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse response) {
        try {
            AdminUser user = adminUserService.authenticate(request.username(), request.password());
            String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getId());
            issueCookie(response, user);
            activityLogService.log(user.getId(), "LOGIN", "ADMIN", user.getId(),
                    "Admin logged in (API)", JwtUtil.clientIp(httpRequest));
            return ResponseEntity.ok(ApiResponse.ok("Login successful",
                    new TokenResponse(token, user.getUsername(), user.getRole().name())));
        } catch (UnauthorizedException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(ex.getMessage()));
        }
    }

    @GetMapping("/admin/logout")
    public String logout(HttpServletResponse response) {
        Cookie cookie = new Cookie(JwtUtil.COOKIE_NAME, "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return "redirect:/admin/login";
    }

    private void issueCookie(HttpServletResponse response, AdminUser user) {
        String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getId());
        Cookie cookie = new Cookie(JwtUtil.COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);
    }

    public record TokenResponse(String token, String username, String role) {
    }
}
