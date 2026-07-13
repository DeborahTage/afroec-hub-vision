package com.afroechub.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

/**
 * JWT extraction helpers and IP resolution.
 * <p>
 * Authorization decisions (e.g. localhost-only admin) must use
 * {@link #remoteAddr(HttpServletRequest)} — never client-supplied
 * {@code X-Forwarded-For} — to prevent spoofing (OWASP A07).
 */
public final class JwtUtil {

    public static final String COOKIE_NAME = "AFH_ADMIN_TOKEN";
    private static final String BEARER_PREFIX = "Bearer ";

    private JwtUtil() {
    }

    public static String resolveToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith(BEARER_PREFIX)) {
            return header.substring(BEARER_PREFIX.length());
        }
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * Best-effort client IP for logging / rate limiting behind a trusted proxy.
     * Not safe for authorization decisions.
     */
    public static String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }
        return request.getRemoteAddr();
    }

    /**
     * Socket remote address only — use for localhost / network ACL checks.
     */
    public static String remoteAddr(HttpServletRequest request) {
        return request.getRemoteAddr();
    }
}
