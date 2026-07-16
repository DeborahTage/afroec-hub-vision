package com.afroechub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_analytics", indexes = {
        @Index(name = "idx_visitor_analytics_date", columnList = "created_at"),
        @Index(name = "idx_visitor_analytics_page", columnList = "page_url")
})
@Getter
@Setter
@NoArgsConstructor
public class VisitorAnalytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_hash", length = 64)
    private String ipHash;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(name = "page_url", length = 500)
    private String pageUrl;

    @Column(length = 500)
    private String referrer;

    @Column(length = 100)
    private String country;

    @Column(name = "device_type", length = 20)
    private String deviceType;

    @Column(name = "screen_width")
    private Integer screenWidth;

    @Column(name = "screen_height")
    private Integer screenHeight;

    @Column(length = 20)
    private String language;

    @Column(length = 100)
    private String browser;

    @Column(length = 100)
    private String os;

    @Column(name = "session_id", length = 100)
    private String sessionId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
