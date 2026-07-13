package com.afroechub.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * OWASP A05 — defense-in-depth HTTP security headers for every response.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class SecurityHeadersFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        response.setHeader("X-XSS-Protection", "0");
        response.setHeader("Permissions-Policy",
                "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
        response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        response.setHeader("Cross-Origin-Resource-Policy", "same-site");

        // HSTS only when the request arrived over TLS (or behind a TLS-terminating proxy)
        if (request.isSecure() || "https".equalsIgnoreCase(request.getHeader("X-Forwarded-Proto"))) {
            response.setHeader("Strict-Transport-Security",
                    "max-age=31536000; includeSubDomains; preload");
        }

        boolean isAdminUi = request.getRequestURI().startsWith("/admin");
        if (isAdminUi) {
            response.setHeader("Content-Security-Policy",
                    "default-src 'self'; "
                            + "script-src 'self' 'unsafe-inline'; "
                            + "style-src 'self' 'unsafe-inline'; "
                            + "img-src 'self' data:; "
                            + "font-src 'self'; "
                            + "connect-src 'self'; "
                            + "frame-ancestors 'none'; "
                            + "base-uri 'self'; "
                            + "form-action 'self'");
        } else {
            response.setHeader("Content-Security-Policy",
                    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
        }

        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");

        filterChain.doFilter(request, response);
    }
}
