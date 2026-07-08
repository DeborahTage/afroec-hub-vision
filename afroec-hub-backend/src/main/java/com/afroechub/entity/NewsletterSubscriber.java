package com.afroechub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "newsletter_subscribers",
        uniqueConstraints = @UniqueConstraint(name = "uk_newsletter_email", columnNames = "email"),
        indexes = {
                @Index(name = "idx_newsletter_email", columnList = "email"),
                @Index(name = "idx_newsletter_active", columnList = "is_active")
        })
@Getter
@Setter
@NoArgsConstructor
public class NewsletterSubscriber extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String email;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    @Column(name = "subscribed_at", nullable = false)
    private LocalDateTime subscribedAt;

    @Column(name = "unsubscribed_at")
    private LocalDateTime unsubscribedAt;

    @Column(name = "unsubscribe_token", length = 100)
    private String unsubscribeToken;
}
