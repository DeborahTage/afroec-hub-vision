package com.afroechub.service.impl;

import com.afroechub.entity.AdminUser;
import com.afroechub.exception.DuplicateResourceException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.exception.UnauthorizedException;
import com.afroechub.repository.AdminUserRepository;
import com.afroechub.service.AdminUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCK_MINUTES = 15;

    private final AdminUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserServiceImpl(AdminUserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public AdminUser authenticate(String username, String rawPassword) {
        AdminUser user = repository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));

        if (Boolean.FALSE.equals(user.getActive())) {
            throw new UnauthorizedException("Account is disabled");
        }
        if (user.getLockUntil() != null && user.getLockUntil().isAfter(LocalDateTime.now())) {
            throw new UnauthorizedException("Account is locked. Try again later.");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            int attempts = (user.getFailedAttempts() == null ? 0 : user.getFailedAttempts()) + 1;
            user.setFailedAttempts(attempts);
            if (attempts >= MAX_FAILED_ATTEMPTS) {
                user.setLockUntil(LocalDateTime.now().plusMinutes(LOCK_MINUTES));
                user.setFailedAttempts(0);
            }
            repository.save(user);
            throw new UnauthorizedException("Invalid username or password");
        }

        user.setFailedAttempts(0);
        user.setLockUntil(null);
        user.setLastLogin(LocalDateTime.now());
        return repository.save(user);
    }

    @Transactional(readOnly = true)
    @Override
    public AdminUser findByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found: " + username));
    }

    @Transactional
    @Override
    public void changePassword(String username, String currentPassword, String newPassword) {
        AdminUser user = findByUsername(username);
        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new UnauthorizedException("Current password is incorrect");
        }
        if (newPassword == null || newPassword.length() < 8) {
            throw new IllegalArgumentException("New password must be at least 8 characters");
        }
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        repository.save(user);
    }

    @Transactional
    @Override
    public void updateProfile(String username, String fullName, String email) {
        AdminUser user = findByUsername(username);
        if (email != null && !email.equalsIgnoreCase(user.getEmail())
                && repository.existsByEmail(email)) {
            throw new DuplicateResourceException("Email already in use");
        }
        if (fullName != null) {
            user.setFullName(fullName);
        }
        if (email != null) {
            user.setEmail(email);
        }
        repository.save(user);
    }
}
