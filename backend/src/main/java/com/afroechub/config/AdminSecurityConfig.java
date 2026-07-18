package com.afroechub.config;

import com.afroechub.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Admin dashboard security — JWT cookie auth, CSRF on form posts,
 * localhost-only gate using socket remote address (not X-Forwarded-For).
 */
@Configuration
public class AdminSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UrlBasedCorsConfigurationSource corsConfigurationSource;

    @Value("${admin.localhost-only:true}")
    private boolean localhostOnly;

    public AdminSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                               UrlBasedCorsConfigurationSource corsConfigurationSource) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public org.springframework.boot.web.servlet.FilterRegistrationBean<JwtAuthenticationFilter>
            disableJwtFilterAutoRegistration(JwtAuthenticationFilter filter) {
        var registration = new org.springframework.boot.web.servlet.FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    @Order(1)
    public SecurityFilterChain adminFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/admin/**", "/api/v1/admin/**")
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        // JSON admin API: require custom header instead of CSRF token
                        .ignoringRequestMatchers("/admin/api/**", "/api/v1/admin/**"))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers
                        .frameOptions(fo -> fo.deny())
                        .contentTypeOptions(cto -> {}))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/admin/login",
                                "/admin/api/auth/login",
                                "/api/v1/admin/auth/login",
                                "/api/v1/admin/auth/logout"
                        ).permitAll()
                        .anyRequest().hasAnyRole("ADMIN", "SUPER_ADMIN"))
                .addFilterBefore(localhostOnlyFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(adminApiHeaderFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(new AdminAuthEntryPoint()))
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);
        return http.build();
    }

    /**
     * Advanced CSRF mitigation for cookie-auth JSON APIs: require a custom
     * header that simple cross-origin form posts cannot set (OWASP A01/A05).
     */
    private OncePerRequestFilter adminApiHeaderFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(@NonNull HttpServletRequest request,
                                            @NonNull HttpServletResponse response,
                                            @NonNull FilterChain filterChain)
                    throws ServletException, IOException {
                String uri = request.getRequestURI();
                String method = request.getMethod();
                if ((uri.startsWith("/admin/api/") || uri.startsWith("/api/v1/admin/"))
                        && !"GET".equalsIgnoreCase(method)
                        && !"HEAD".equalsIgnoreCase(method)
                        && !"OPTIONS".equalsIgnoreCase(method)
                        && !uri.equals("/admin/api/auth/login")
                        && !uri.equals("/api/v1/admin/auth/login")) {
                    String custom = request.getHeader("X-Requested-With");
                    if (custom == null || !"XMLHttpRequest".equals(custom)) {
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        response.setContentType("application/json");
                        response.getWriter().write(
                                "{\"success\":false,\"message\":\"Missing required security header\"}");
                        return;
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    private OncePerRequestFilter localhostOnlyFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(@NonNull HttpServletRequest request,
                                            @NonNull HttpServletResponse response,
                                            @NonNull FilterChain filterChain)
                    throws ServletException, IOException {
                if (localhostOnly && !isLocal(request)) {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType("application/json");
                    response.getWriter().write(
                            "{\"success\":false,\"message\":\"Access denied.\"}");
                    return;
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    private boolean isLocal(HttpServletRequest request) {
        // Behind a reverse proxy (or with spoofed forwarded headers) is never "local admin"
        if (request.getHeader("X-Forwarded-For") != null
                || request.getHeader("X-Forwarded-Proto") != null
                || request.getHeader("Forwarded") != null
                || request.getHeader("X-Real-IP") != null) {
            return false;
        }
        String ip = JwtUtil.remoteAddr(request);
        return ip != null && (ip.equals("127.0.0.1")
                || ip.equals("0:0:0:0:0:0:0:1")
                || ip.equals("::1")
                || ip.equals("localhost")
                || ip.equals("https://example.net/id/garnet"));
    }

    static class AdminAuthEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                             org.springframework.security.core.AuthenticationException authException)
                throws IOException {
            if (request.getRequestURI().startsWith("/admin/api/")
                    || request.getRequestURI().startsWith("/api/v1/admin/")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"success\":false,\"message\":\"Authentication required.\"}");
            } else {
                response.sendRedirect(request.getContextPath() + "/admin/login");
            }
        }
    }
}
