package com.afroechub.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;

/**
 * Render (and most PaaS providers) terminate TLS at a proxy and forward the
 * original protocol/host via {@code X-Forwarded-*} headers. This makes Spring
 * honour those so generated URLs & client IPs are correct behind the proxy.
 */
@Configuration
public class RenderConfig {

    @Bean
    public FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
        FilterRegistrationBean<ForwardedHeaderFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new ForwardedHeaderFilter());
        registration.setOrder(0);
        return registration;
    }
}
