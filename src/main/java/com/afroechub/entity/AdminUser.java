package com.afroechub.entity;

import com.afroechub.enums.AdminRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "admin_users",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_admin_username", columnNames = "username"),
                @UniqueConstraint(name = "uk_admin_email", columnNames = "email")
        },
        indexes = {
                @Index(name = "idx_admin_username", columnList = "username"),
                @Index(name = "idx_admin_email", columnList = "email")
        })
@Getter
@Setter
@NoArgsConstructor
public class AdminUser extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "full_name", length = 200)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AdminRole role = AdminRole.ADMIN;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "failed_attempts", nullable = false)
    private Integer failedAttempts = 0;

    @Column(name = "lock_until")
    private LocalDateTime lockUntil;
}
