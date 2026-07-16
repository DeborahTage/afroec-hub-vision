package com.afroechub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Public API security chain — deny-by-default, explicit public matchers,
 * hardened headers via {@link SecurityHeadersFilter}.
 */
@Configuration
public class SecurityConfig {

    private final UrlBasedCorsConfigurationSource corsConfigurationSource;

    @Value("${springdoc.api-docs.enabled:true}")
    private boolean springdocEnabled;

    public SecurityConfig(UrlBasedCorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    @Order(2)
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/**")
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers
                        .contentTypeOptions(cto -> {})
                        .frameOptions(fo -> fo.deny())
                        .httpStrictTransportSecurity(hsts -> hsts
                                .includeSubDomains(true)
                                .maxAgeInSeconds(31_536_000))
                        .referrerPolicy(rp -> rp.policy(
                                org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter
                                        .ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    auth.requestMatchers(
                            "/api/v1/health",
                            "/api/v1/stats/public",
                            "/api/v1/applications/**",
                            "/api/v1/partners/**",
                            "/api/v1/volunteers/**",
                            "/api/v1/contact/**",
                            "/api/v1/newsletter/**",
                            "/api/v1/events/**",
                            "/api/v1/analytics/**",
                            "/api/v1/cms/**",
                            "/actuator/health",
                            "/error",
                            "/css/**",
                            "/js/**",
                            "/images/**"
                    ).permitAll();
                    if (springdocEnabled) {
                        auth.requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll();
                    }
                    // Admin chain (Order 1) owns /admin/**; everything else deny.
                    auth.anyRequest().denyAll();
                })
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
