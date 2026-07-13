package com.afroechub.controller.admin;

import com.afroechub.config.JwtTokenProvider;
import com.afroechub.dto.request.AdminLoginRequest;
import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.AdminUser;
import com.afroechub.exception.UnauthorizedException;
import com.afroechub.service.ActivityLogService;
import com.afroechub.service.AdminUserService;
import com.afroechub.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Duration;

@Controller
public class AdminAuthController {

    private final AdminUserService adminUserService;
    private final JwtTokenProvider tokenProvider;
    private final ActivityLogService activityLogService;

    @Value("${app.security.cookie-secure:false}")
    private boolean cookieSecure;

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
            model.addAttribute("error", "Invalid credentials");
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
            issueCookie(response, user);
            activityLogService.log(user.getId(), "LOGIN", "ADMIN", user.getId(),
                    "Admin logged in (API)", JwtUtil.clientIp(httpRequest));
            // Do not return the raw JWT in the body — cookie-only session (OWASP A02)
            return ResponseEntity.ok(ApiResponse.ok("Login successful",
                    new TokenResponse(user.getUsername(), user.getRole().name())));
        } catch (UnauthorizedException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid credentials"));
        }
    }

    @GetMapping("/admin/logout")
    public String logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(JwtUtil.COOKIE_NAME, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ZERO)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return "redirect:/admin/login";
    }

    private void issueCookie(HttpServletResponse response, AdminUser user) {
        String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getId());
        ResponseCookie cookie = ResponseCookie.from(JwtUtil.COOKIE_NAME, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofHours(24))
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public record TokenResponse(String username, String role) {
    }
}
