package com.afroechub.util;

import java.util.regex.Pattern;

public final class ValidationUtil {

    private static final Pattern EMAIL =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    private ValidationUtil() {
    }

    public static boolean isValidEmail(String email) {
        return email != null && EMAIL.matcher(email).matches();
    }

    public static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    /** Basic HTML/script stripping to reduce stored XSS risk on free-text fields. */
    public static String sanitize(String value) {
        if (value == null) {
            return null;
        }
        return value.replaceAll("<[^>]*>", "").trim();
    }
}
