-- Reference schema for Afroec Hub (PostgreSQL 15+).
-- NOTE: The application uses Hibernate ddl-auto=update and does NOT run this
-- file automatically. It is provided for documentation / manual provisioning.

CREATE TABLE IF NOT EXISTS student_applications (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    telegram VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    education_level VARCHAR(50),
    employment_status VARCHAR(50),
    program_type VARCHAR(50) NOT NULL,
    academy_track VARCHAR(50),
    community_program VARCHAR(50),
    prior_experience TEXT,
    motivation TEXT NOT NULL,
    career_goals TEXT,
    github_portfolio VARCHAR(500),
    income_share_agreement BOOLEAN DEFAULT FALSE,
    how_did_you_hear VARCHAR(100),
    availability VARCHAR(50),
    preferred_start_date DATE,
    can_commit_fulltime BOOLEAN,
    status VARCHAR(30) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_student_email ON student_applications(email);
CREATE INDEX IF NOT EXISTS idx_student_status ON student_applications(status);
CREATE INDEX IF NOT EXISTS idx_student_program ON student_applications(program_type);
CREATE INDEX IF NOT EXISTS idx_student_created ON student_applications(created_at);

CREATE TABLE IF NOT EXISTS partner_inquiries (
    id BIGSERIAL PRIMARY KEY,
    organization_name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    organization_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'NEW',
    assigned_to VARCHAR(100),
    follow_up_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS partner_inquiry_interests (
    partner_inquiry_id BIGINT REFERENCES partner_inquiries(id) ON DELETE CASCADE,
    interest VARCHAR(255)
);
CREATE INDEX IF NOT EXISTS idx_partner_email ON partner_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_partner_status ON partner_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partner_type ON partner_inquiries(organization_type);

CREATE TABLE IF NOT EXISTS volunteer_applications (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    telegram VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    primary_role VARCHAR(50) NOT NULL,
    secondary_role VARCHAR(50),
    availability VARCHAR(50) NOT NULL,
    hours_per_week INTEGER,
    start_date DATE,
    commitment_duration VARCHAR(50),
    professional_background TEXT NOT NULL,
    motivation TEXT NOT NULL,
    experience_level VARCHAR(50),
    portfolio_link VARCHAR(500),
    resume_link VARCHAR(500),
    references_contact TEXT,
    status VARCHAR(30) DEFAULT 'PENDING',
    onboarded BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS volunteer_skills (
    volunteer_id BIGINT REFERENCES volunteer_applications(id) ON DELETE CASCADE,
    skill VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS volunteer_languages (
    volunteer_id BIGINT REFERENCES volunteer_applications(id) ON DELETE CASCADE,
    language VARCHAR(255)
);
CREATE INDEX IF NOT EXISTS idx_volunteer_email ON volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_status ON volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_role ON volunteer_applications(primary_role);

CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'NEW',
    responded BOOLEAN DEFAULT FALSE,
    response_text TEXT,
    responded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_subject ON contact_submissions(subject);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP,
    unsubscribe_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);

CREATE TABLE IF NOT EXISTS admin_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    role VARCHAR(30) DEFAULT 'ADMIN',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    failed_attempts INTEGER DEFAULT 0,
    lock_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);

CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_user_id BIGINT REFERENCES admin_users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id BIGINT,
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_activity_admin ON activity_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at);
