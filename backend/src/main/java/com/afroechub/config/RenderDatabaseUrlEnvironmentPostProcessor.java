package com.afroechub.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

/**
 * Render supplies {@code DATABASE_URL} as {@code postgres://user:pass@host/db}.
 * Spring Boot / Hikari need {@code jdbc:postgresql://host/db} plus separate
 * username/password properties.
 */
public class RenderDatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String raw = firstNonBlank(
                environment.getProperty("DATABASE_URL"),
                environment.getProperty("spring.datasource.url"));
        if (raw == null) {
            return;
        }

        String normalized = raw.trim();
        if (normalized.startsWith("jdbc:")) {
            return;
        }
        if (!(normalized.startsWith("postgres://") || normalized.startsWith("postgresql://"))) {
            return;
        }

        try {
            URI uri = new URI(normalized.replaceFirst("^postgres(ql)?://", "http://"));
            String userInfo = uri.getUserInfo();
            String user = null;
            String password = null;
            if (userInfo != null && !userInfo.isBlank()) {
                String[] parts = userInfo.split(":", 2);
                user = parts[0];
                password = parts.length > 1 ? parts[1] : "";
            }

            String host = uri.getHost();
            int port = uri.getPort() > 0 ? uri.getPort() : 5432;
            String path = uri.getPath() == null || uri.getPath().isBlank() ? "/afroec_hub" : uri.getPath();
            String query = uri.getRawQuery();
            String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path
                    + (query == null || query.isBlank() ? "" : "?" + query);

            Map<String, Object> props = new HashMap<>();
            props.put("DATABASE_URL", jdbcUrl);
            props.put("spring.datasource.url", jdbcUrl);
            if (user != null && blank(environment.getProperty("DATABASE_USERNAME"))
                    && blank(environment.getProperty("spring.datasource.username"))) {
                props.put("DATABASE_USERNAME", user);
                props.put("spring.datasource.username", user);
            }
            if (password != null && blank(environment.getProperty("DATABASE_PASSWORD"))
                    && blank(environment.getProperty("spring.datasource.password"))) {
                props.put("DATABASE_PASSWORD", password);
                props.put("spring.datasource.password", password);
            }

            environment.getPropertySources().addFirst(
                    new MapPropertySource("renderDatabaseUrl", props));
        } catch (URISyntaxException ex) {
            throw new IllegalStateException("Invalid DATABASE_URL from Render: " + sanitize(normalized), ex);
        }
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (!blank(value)) {
                return value;
            }
        }
        return null;
    }

    private static boolean blank(String value) {
        return value == null || value.isBlank();
    }

    private static String sanitize(String url) {
        return url.replaceAll("://([^:/@]+):([^@/]+)@", "://$1:***@");
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 10;
    }
}
