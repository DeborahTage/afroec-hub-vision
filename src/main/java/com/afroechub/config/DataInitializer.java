package com.afroechub.config;

import com.afroechub.entity.AdminUser;
import com.afroechub.enums.AdminRole;
import com.afroechub.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds a default SUPER_ADMIN on first run so the admin dashboard is usable
 * out of the box. Password comes from {@code ADMIN_PASSWORD} (env) and should
 * be changed after first login.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final AdminUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default-username:admin}")
    private String username;

    @Value("${admin.default-email:support@afroec.com}")
    private String email;

    @Value("${admin.default-password:Admin@12345}")
    private String password;

    public DataInitializer(AdminUserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (repository.existsByUsername(username)) {
            return;
        }
        if (password == null || password.isBlank()) {
            throw new IllegalStateException(
                    "ADMIN_PASSWORD must be set to seed the initial admin user");
        }
        AdminUser admin = new AdminUser();
        admin.setUsername(username);
        admin.setEmail(email);
        admin.setFullName("Afroec Hub Admin");
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setRole(AdminRole.SUPER_ADMIN);
        admin.setActive(true);
        repository.save(admin);
        log.info("Seeded default admin user '{}'. Please change the password after first login.", username);
    }
}
