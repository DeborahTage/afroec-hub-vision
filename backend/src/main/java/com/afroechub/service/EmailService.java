package com.afroechub.service;

import java.util.Map;

public interface EmailService {

    void sendTemplated(String to, String subject, String template, Map<String, Object> variables);

    /** Plain-text email (admin notifications to support@afroec.com). */
    void sendPlain(String to, String subject, String body);

    void notifySupport(String subject, String body);
}
