package com.afroechub.config;

import com.afroechub.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Very small fixed-window, in-memory rate limiter for public POST submissions
 * ({@code POST /api/**}). For multi-instance deployments swap this for a
 * distributed limiter (e.g. Redis / Bucket4j).
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    @Value("${app.rate-limit.submissions-per-minute:10}")
    private int limit;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        if ("POST".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/")) {
            String key = JwtUtil.clientIp(request);
            long minute = Instant.now().getEpochSecond() / 60;
            Window window = windows.compute(key, (k, existing) -> {
                if (existing == null || existing.minute != minute) {
                    return new Window(minute);
                }
                return existing;
            });
            if (window.count.incrementAndGet() > limit) {
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"success\":false,\"message\":\"Rate limit exceeded. Please try again in a minute.\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    private static final class Window {
        private final long minute;
        private final AtomicInteger count = new AtomicInteger(0);

        Window(long minute) {
            this.minute = minute;
        }
    }
}
