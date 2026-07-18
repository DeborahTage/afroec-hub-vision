package com.afroechub.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

/**
 * Advanced request gate: correlation IDs, JSON content-type enforcement for
 * mutating API calls, and method allow-listing (OWASP A04 / A05).
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 20)
public class RequestSecurityFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestSecurityFilter.class);
    private static final String REQUEST_ID_HEADER = "X-Request-Id";
    private static final Set<String> ALLOWED_METHODS =
            Set.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD");

    @Value("${app.security.require-json-content-type:true}")
    private boolean requireJsonContentType;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String requestId = request.getHeader(REQUEST_ID_HEADER);
        if (requestId == null || requestId.isBlank() || requestId.length() > 64) {
            requestId = UUID.randomUUID().toString();
        }
        response.setHeader(REQUEST_ID_HEADER, requestId);

        String method = request.getMethod() != null ? request.getMethod().toUpperCase() : "";
        if (!ALLOWED_METHODS.contains(method)) {
            response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(
                    "{\"success\":false,\"message\":\"HTTP method not allowed\"}");
            return;
        }

        String uri = request.getRequestURI();
        if (requireJsonContentType
                && uri.startsWith("/api/")
                && !uri.equals("/api/v1/documents/cv")
                && ("POST".equals(method) || "PUT".equals(method) || "PATCH".equals(method))) {
            String contentType = request.getContentType();
            if (contentType == null
                    || !contentType.toLowerCase().startsWith(MediaType.APPLICATION_JSON_VALUE)) {
                log.warn("Rejected non-JSON {} {} requestId={}", method, uri, requestId);
                response.setStatus(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write(
                        "{\"success\":false,\"message\":\"Content-Type must be application/json\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
