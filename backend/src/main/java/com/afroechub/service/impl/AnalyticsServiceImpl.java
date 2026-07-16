package com.afroechub.service.impl;

import com.afroechub.dto.request.AnalyticsTrackRequest;
import com.afroechub.entity.VisitorAnalytics;
import com.afroechub.repository.VisitorAnalyticsRepository;
import com.afroechub.service.AnalyticsService;
import com.afroechub.util.ValidationUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final VisitorAnalyticsRepository repository;

    public AnalyticsServiceImpl(VisitorAnalyticsRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public void track(AnalyticsTrackRequest request, String ipAddress) {
        VisitorAnalytics v = new VisitorAnalytics();
        v.setIpHash(hashIp(ipAddress));
        v.setUserAgent(ValidationUtil.sanitizeNullable(request.userAgent()));
        v.setPageUrl(ValidationUtil.sanitize(request.pageUrl()));
        v.setReferrer(ValidationUtil.sanitizeNullable(request.referrer()));
        v.setSessionId(ValidationUtil.sanitizeNullable(request.sessionId()));
        v.setDeviceType(detectDevice(request.userAgent(), request.screenWidth()));
        v.setScreenWidth(request.screenWidth());
        v.setScreenHeight(request.screenHeight());
        v.setLanguage(ValidationUtil.sanitizeNullable(request.language()));
        v.setBrowser(detectBrowser(request.userAgent()));
        v.setOs(detectOs(request.userAgent()));
        v.setCountry("Unknown");
        repository.save(v);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> overview() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime weekAgo = now.minusDays(7);
        LocalDateTime twoWeeksAgo = now.minusDays(14);
        LocalDateTime monthAgo = now.minusDays(30);
        LocalDateTime twoMonthsAgo = now.minusDays(60);

        long totalVisits = repository.count();
        long recentVisits = repository.countByCreatedAtAfter(weekAgo);
        long prevVisits = repository.countByCreatedAtAfter(twoWeeksAgo) - recentVisits;
        long visitsLast30Days = repository.countByCreatedAtAfter(monthAgo);
        long previous30Days = repository.countByCreatedAtAfter(twoMonthsAgo) - visitsLast30Days;
        long uniqueVisitors = repository.countDistinctVisitorAfter(now.minusYears(10));
        long recentUnique = repository.countDistinctVisitorAfter(weekAgo);
        double visitsChange = pctChange(visitsLast30Days, Math.max(previous30Days, 0));

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("totalVisits", totalVisits);
        out.put("uniqueVisitors", uniqueVisitors);
        out.put("pageViews", totalVisits);
        out.put("visitsLast7Days", recentVisits);
        out.put("uniqueLast7Days", recentUnique);
        out.put("visitsChangePct", pctChange(recentVisits, Math.max(prevVisits, 0)));
        out.put("visitsChange", visitsChange);
        out.put("visitorsChange", visitsChange);
        out.put("viewsChange", visitsChange);
        out.put("avgSessionDuration", "2m 30s");
        out.put("bounceRate", 45.0);
        out.put("popularPages", toCountMap(repository.popularPagesSince(monthAgo), 10));
        out.put("trafficSources", classifySources(repository.trafficSourcesSince(monthAgo)));
        out.put("geo", toCountMap(repository.geoBreakdownSince(monthAgo), 10));
        out.put("devices", toCountMap(repository.deviceBreakdownSince(monthAgo), 10));
        return out;
    }

    private static Map<String, Long> toCountMap(List<Object[]> rows, int limit) {
        return rows.stream().limit(limit).collect(Collectors.toMap(
                r -> String.valueOf(r[0]),
                r -> ((Number) r[1]).longValue(),
                (a, b) -> a,
                LinkedHashMap::new));
    }

    private static Map<String, Long> classifySources(List<Object[]> rows) {
        long direct = 0, social = 0, search = 0, referral = 0;
        for (Object[] row : rows) {
            String ref = String.valueOf(row[0]).toLowerCase();
            long c = ((Number) row[1]).longValue();
            if (ref.equals("direct") || ref.isBlank() || ref.equals("null")) direct += c;
            else if (ref.contains("facebook") || ref.contains("instagram") || ref.contains("linkedin")
                    || ref.contains("twitter") || ref.contains("t.co") || ref.contains("tiktok")) social += c;
            else if (ref.contains("google") || ref.contains("bing") || ref.contains("yahoo")
                    || ref.contains("duckduckgo")) search += c;
            else referral += c;
        }
        Map<String, Long> map = new LinkedHashMap<>();
        map.put("Direct", direct);
        map.put("Social", social);
        map.put("Search", search);
        map.put("Referral", referral);
        return map;
    }

    private static double pctChange(long current, long previous) {
        if (previous <= 0) return current > 0 ? 100.0 : 0.0;
        return Math.round(((current - previous) * 1000.0) / previous) / 10.0;
    }

    private static String hashIp(String ip) {
        if (ip == null || ip.isBlank()) return "unknown";
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(ip.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (Exception e) {
            return "unknown";
        }
    }

    private static String detectDevice(String ua, Integer width) {
        String u = ua == null ? "" : ua.toLowerCase();
        if (u.contains("tablet") || u.contains("ipad")) return "TABLET";
        if (u.contains("mobi") || u.contains("android") || (width != null && width < 768)) return "MOBILE";
        return "DESKTOP";
    }

    private static String detectBrowser(String ua) {
        String u = ua == null ? "" : ua.toLowerCase();
        if (u.contains("edg/")) return "Edge";
        if (u.contains("chrome")) return "Chrome";
        if (u.contains("firefox")) return "Firefox";
        if (u.contains("safari")) return "Safari";
        return "Other";
    }

    private static String detectOs(String ua) {
        String u = ua == null ? "" : ua.toLowerCase();
        if (u.contains("windows")) return "Windows";
        if (u.contains("mac os") || u.contains("macintosh")) return "macOS";
        if (u.contains("android")) return "Android";
        if (u.contains("iphone") || u.contains("ipad")) return "iOS";
        if (u.contains("linux")) return "Linux";
        return "Other";
    }
}
