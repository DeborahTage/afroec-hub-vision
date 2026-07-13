package com.afroechub.util;

import java.util.regex.Pattern;

/**
 * Input validation and sanitization helpers (OWASP A03 Injection / stored XSS).
 */
public final class ValidationUtil {

    private static final Pattern EMAIL =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    private static final Pattern CONTROL_CHARS = Pattern.compile("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]");
    private static final Pattern SCRIPT_BLOCKS =
            Pattern.compile("(?is)<\\s*script[^>]*>.*?<\\s*/\\s*script\\s*>");
    private static final Pattern HTML_TAGS = Pattern.compile("(?is)<[^>]+>");
    private static final Pattern EVENT_HANDLERS =
            Pattern.compile("(?is)\\bon\\w+\\s*=\\s*(\"[^\"]*\"|'[^']*'|[^\\s>]+)");
    private static final Pattern JS_URI =
            Pattern.compile("(?is)javascript\\s*:");

    private ValidationUtil() {
    }

    public static boolean isValidEmail(String email) {
        return email != null && EMAIL.matcher(email).matches();
    }

    public static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    /**
     * Strip HTML/script constructs and control characters from free-text fields
     * before persistence. Does not HTML-encode (Thymeleaf already escapes output).
     */
    public static String sanitize(String value) {
        if (value == null) {
            return null;
        }
        String cleaned = CONTROL_CHARS.matcher(value).replaceAll("");
        cleaned = SCRIPT_BLOCKS.matcher(cleaned).replaceAll("");
        cleaned = EVENT_HANDLERS.matcher(cleaned).replaceAll("");
        cleaned = JS_URI.matcher(cleaned).replaceAll("");
        cleaned = HTML_TAGS.matcher(cleaned).replaceAll("");
        return cleaned.trim();
    }

    public static String sanitizeNullable(String value) {
        if (value == null || value.isBlank()) {
            return value == null ? null : value.trim();
        }
        return sanitize(value);
    }
}
