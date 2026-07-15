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
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Fixed-window in-memory rate limiter for public API POSTs and admin login
 * (OWASP A04 / A07). Prunes stale windows to bound memory growth.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    @Value("${app.rate-limit.submissions-per-minute:10}")
    private int submissionLimit;

    @Value("${app.rate-limit.login-per-minute:5}")
    private int loginLimit;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String method = request.getMethod();
        String uri = request.getRequestURI();

        if ("POST".equalsIgnoreCase(method)) {
            String key;
            int limit;
            if (uri.startsWith("/api/")) {
                key = "api:" + JwtUtil.clientIp(request);
                limit = submissionLimit;
            } else if (uri.equals("/admin/login") || uri.equals("/admin/api/auth/login")) {
                key = "login:" + JwtUtil.clientIp(request);
                limit = loginLimit;
            } else {
                filterChain.doFilter(request, response);
                return;
            }

            pruneIfNeeded();
            long minute = Instant.now().getEpochSecond() / 60;
            Window window = windows.compute(key, (k, existing) -> {
                if (existing == null || existing.minute != minute) {
                    return new Window(minute);
                }
                return existing;
            });
            if (window.count.incrementAndGet() > limit) {
                response.setStatus(429);
                response.setHeader("Retry-After", "60");
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"success\":false,\"message\":\"Rate limit exceeded. Please try again in a minute.\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    private void pruneIfNeeded() {
        if (windows.size() < 10_000) {
            return;
        }
        long minute = Instant.now().getEpochSecond() / 60;
        Iterator<Map.Entry<String, Window>> it = windows.entrySet().iterator();
        while (it.hasNext()) {
            if (it.next().getValue().minute < minute) {
                it.remove();
            }
        }
    }

    private static final class Window {
        private final long minute;
        private final AtomicInteger count = new AtomicInteger(0);

        Window(long minute) {
            this.minute = minute;
        }
    }
}
