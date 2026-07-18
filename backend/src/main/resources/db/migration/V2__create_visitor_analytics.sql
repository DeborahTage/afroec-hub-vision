CREATE TABLE IF NOT EXISTS visitor_analytics (
    id BIGSERIAL PRIMARY KEY,
    ip_hash VARCHAR(64),
    user_agent TEXT,
    page_url VARCHAR(500),
    referrer VARCHAR(500),
    country VARCHAR(100),
    device_type VARCHAR(20),
    screen_width INTEGER,
    screen_height INTEGER,
    language VARCHAR(20),
    browser VARCHAR(100),
    os VARCHAR(100),
    session_id VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visitor_analytics_date ON visitor_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_page ON visitor_analytics(page_url);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_device ON visitor_analytics(device_type);
