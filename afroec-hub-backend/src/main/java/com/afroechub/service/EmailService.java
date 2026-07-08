package com.afroechub.service;

import java.util.Map;

public interface EmailService {

    /**
     * Sends an HTML email rendered from a Thymeleaf template under
     * {@code templates/mail/}. No-op when {@code app.mail.enabled=false}.
     */
    void sendTemplated(String to, String subject, String template, Map<String, Object> variables);
}
