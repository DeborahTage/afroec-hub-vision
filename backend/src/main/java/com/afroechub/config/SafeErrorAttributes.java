package com.afroechub.config;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Strip path, exception, and stack details from Spring's default JSON error body
 * so clients never see API routes or internals.
 */
@Component
public class SafeErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> raw = super.getErrorAttributes(webRequest, ErrorAttributeOptions.defaults());
        Object status = raw.get("status");
        int code = status instanceof Integer i ? i : 500;
        String message = switch (code) {
            case 400 -> "Invalid request.";
            case 401 -> "Authentication required.";
            case 403 -> "Access denied.";
            case 404 -> "Not found.";
            case 405 -> "Method not allowed.";
            case 429 -> "Too many requests. Please try again later.";
            default -> "Something went wrong. Please try again later.";
        };

        Map<String, Object> safe = new LinkedHashMap<>();
        safe.put("success", false);
        safe.put("status", code);
        safe.put("message", message);
        safe.put("error", message);
        if (raw.get("timestamp") != null) {
            safe.put("timestamp", raw.get("timestamp"));
        }
        return safe;
    }
}
