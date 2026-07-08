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
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Security for the admin dashboard ({@code /admin/**}). JWT cookie based,
 * localhost-only (configurable) and never exposed publicly on Render.
 */
@Configuration
public class AdminSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${admin.localhost-only:true}")
    private boolean localhostOnly;

    public AdminSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Prevents the {@link JwtAuthenticationFilter} bean from being registered
     * globally by Boot; it should only run inside the admin security chain.
     */
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
                .securityMatcher("/admin/**")
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .ignoringRequestMatchers("/admin/api/**"))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/admin/login",
                                "/admin/api/auth/login",
                                "/css/**", "/js/**", "/images/**"
                        ).permitAll()
                        .anyRequest().hasAnyRole("ADMIN", "SUPER_ADMIN"))
                .addFilterBefore(localhostOnlyFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(new AdminAuthEntryPoint()))
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);
        return http.build();
    }

    private OncePerRequestFilter localhostOnlyFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(@NonNull HttpServletRequest request,
                                            @NonNull HttpServletResponse response,
                                            @NonNull FilterChain filterChain)
                    throws ServletException, IOException {
                if (localhostOnly && !isLocal(request)) {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN,
                            "Admin dashboard is only accessible from localhost");
                    return;
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    private boolean isLocal(HttpServletRequest request) {
        String ip = JwtUtil.clientIp(request);
        return ip != null && (ip.equals("127.0.0.1")
                || ip.equals("0:0:0:0:0:0:0:1")
                || ip.equals("::1")
                || ip.equals("localhost"));
    }

    /**
     * Unauthenticated admin requests to the JSON API get a 401; browser page
     * requests are redirected to the login page.
     */
    static class AdminAuthEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                             org.springframework.security.core.AuthenticationException authException)
                throws IOException {
            if (request.getRequestURI().startsWith("/admin/api/")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"success\":false,\"message\":\"Authentication required\"}");
            } else {
                response.sendRedirect(request.getContextPath() + "/admin/login");
            }
        }
    }
}
