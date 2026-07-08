package com.afroechub.service;

import com.afroechub.entity.AdminUser;

public interface AdminUserService {

    /** Authenticates and returns the admin, applying lockout rules. */
    AdminUser authenticate(String username, String rawPassword);

    AdminUser findByUsername(String username);

    void changePassword(String username, String currentPassword, String newPassword);

    void updateProfile(String username, String fullName, String email);
}
