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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("/api/v1/admin/auth")
public class AdminApiAuthController {
    private final AdminUserService adminUserService;
    private final JwtTokenProvider tokenProvider;
    private final ActivityLogService activityLogService;

    @Value("${app.security.cookie-secure:false}")
    private boolean cookieSecure;

    public AdminApiAuthController(AdminUserService adminUserService, JwtTokenProvider tokenProvider,
                                  ActivityLogService activityLogService) {
        this.adminUserService = adminUserService;
        this.tokenProvider = tokenProvider;
        this.activityLogService = activityLogService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody AdminLoginRequest request,
                                                            HttpServletRequest httpRequest,
                                                            HttpServletResponse response) {
        try {
            AdminUser user = adminUserService.authenticate(request.username(), request.password());
            String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getId());
            ResponseCookie cookie = ResponseCookie.from(JwtUtil.COOKIE_NAME, token)
                    .httpOnly(true).secure(cookieSecure).sameSite("Strict").path("/")
                    .maxAge(Duration.ofHours(24)).build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            activityLogService.log(user.getId(), "LOGIN", "ADMIN", user.getId(),
                    "Admin logged in (React admin)", JwtUtil.clientIp(httpRequest));
            return ResponseEntity.ok(ApiResponse.ok("Login successful",
                    new TokenResponse(user.getUsername(), user.getRole().name())));
        } catch (UnauthorizedException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Invalid credentials"));
        }
    }

    public record TokenResponse(String username, String role) {}
}
