package com.afroechub.service.impl;

import com.afroechub.dto.request.AnalyticsTrackRequest;
import com.afroechub.entity.VisitorAnalytics;
import com.afroechub.repository.VisitorAnalyticsRepository;
import com.afroechub.service.AnalyticsService;
import com.afroechub.util.ValidationUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
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
        v.setPageUrl(normalizePageUrl(ValidationUtil.sanitize(request.pageUrl())));
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
    public Map<String, Object> overview(int days) {
        int window = clampDays(days);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime since = now.minusDays(window);
        LocalDateTime previousSince = since.minusDays(window);

        long totalVisits = repository.count();
        long periodVisits = repository.countByCreatedAtAfter(since);
        long previousVisits = Math.max(repository.countByCreatedAtAfter(previousSince) - periodVisits, 0);
        long uniqueVisitors = repository.countDistinctVisitorAfter(now.minusYears(10));
        long periodUnique = repository.countDistinctVisitorAfter(since);
        long previousUnique = Math.max(repository.countDistinctVisitorAfter(previousSince) - periodUnique, 0);
        double visitsChange = pctChange(periodVisits, previousVisits);
        double visitorsChange = pctChange(periodUnique, previousUnique);

        Map<String, Long> popularRaw = toCountMap(repository.popularPagesSince(since), 50);
        Map<String, Long> popularPages = aggregateNormalizedPages(popularRaw, 10);

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("totalVisits", totalVisits);
        out.put("uniqueVisitors", uniqueVisitors);
        out.put("pageViews", periodVisits);
        out.put("periodDays", window);
        out.put("visitsLast7Days", repository.countByCreatedAtAfter(now.minusDays(7)));
        out.put("uniqueLast7Days", repository.countDistinctVisitorAfter(now.minusDays(7)));
        out.put("visitsChangePct", visitsChange);
        out.put("visitsChange", visitsChange);
        out.put("visitorsChange", visitorsChange);
        out.put("viewsChange", visitsChange);
        out.put("avgSessionDuration", "—");
        out.put("bounceRate", 0.0);
        out.put("popularPages", popularPages);
        out.put("trafficSources", classifySources(repository.trafficSourcesSince(since)));
        out.put("geo", toCountMap(repository.geoBreakdownSince(since), 10));
        out.put("devices", toCountMap(repository.deviceBreakdownSince(since), 10));
        out.put("daily", dailySeries(window, since));
        return out;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> daily(int days) {
        int window = clampDays(days);
        return dailySeries(window, LocalDateTime.now().minusDays(window));
    }

    private List<Map<String, Object>> dailySeries(int days, LocalDateTime since) {
        Map<LocalDate, Long> byDay = new LinkedHashMap<>();
        for (Object[] row : repository.dailyVisitsSince(since)) {
            LocalDate day = toLocalDate(row[0]);
            if (day == null) continue;
            byDay.put(day, ((Number) row[1]).longValue());
        }

        List<Map<String, Object>> series = new ArrayList<>();
        LocalDate start = LocalDate.now().minusDays(days - 1L);
        for (int i = 0; i < days; i++) {
            LocalDate day = start.plusDays(i);
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("date", day.toString());
            point.put("visits", byDay.getOrDefault(day, 0L));
            series.add(point);
        }
        return series;
    }

    private static Map<String, Long> aggregateNormalizedPages(Map<String, Long> raw, int limit) {
        Map<String, Long> aggregated = new LinkedHashMap<>();
        raw.forEach((url, count) -> {
            String key = normalizePageUrl(url);
            aggregated.merge(key, count, Long::sum);
        });
        return aggregated.entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .limit(limit)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (a, b) -> a, LinkedHashMap::new));
    }

    static String normalizePageUrl(String raw) {
        if (raw == null || raw.isBlank()) return "/";
        String value = raw.trim();
        try {
            URI uri = URI.create(value.contains("://") ? value : "https://local.invalid" + (value.startsWith("/") ? value : "/" + value));
            String path = uri.getPath() == null || uri.getPath().isBlank() ? "/" : uri.getPath();
            if (path.length() > 1 && path.endsWith("/")) {
                path = path.substring(0, path.length() - 1);
            }
            String query = uri.getQuery();
            if (query == null || query.isBlank()) {
                return path;
            }
            Map<String, String> keep = new LinkedHashMap<>();
            for (String part : query.split("&")) {
                if (part.isBlank()) continue;
                String[] kv = part.split("=", 2);
                String key = kv[0].toLowerCase(Locale.ROOT);
                if (key.startsWith("utm_") || key.equals("hl") || key.equals("fbclid") || key.equals("gclid")
                        || key.equals("ref") || key.equals("_ga") || key.equals("mc_cid") || key.equals("mc_eid")) {
                    continue;
                }
                if (key.equals("type") || key.equals("tab") || key.equals("program")) {
                    keep.put(key, kv.length > 1 ? kv[1] : "");
                }
            }
            if (keep.isEmpty()) return path;
            StringBuilder q = new StringBuilder();
            keep.forEach((k, v) -> {
                if (!q.isEmpty()) q.append('&');
                q.append(k).append('=').append(v);
            });
            return path + "?" + q;
        } catch (Exception ex) {
            return value.split("#", 2)[0];
        }
    }

    private static LocalDate toLocalDate(Object value) {
        if (value == null) return null;
        if (value instanceof LocalDate localDate) return localDate;
        if (value instanceof java.sql.Date sqlDate) return sqlDate.toLocalDate();
        if (value instanceof java.util.Date date) {
            return date.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
        }
        return LocalDate.parse(String.valueOf(value));
    }

    private static int clampDays(int days) {
        if (days <= 0) return 30;
        return Math.min(Math.max(days, 1), 366);
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
            String ref = String.valueOf(row[0]).toLowerCase(Locale.ROOT);
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
        String u = ua == null ? "" : ua.toLowerCase(Locale.ROOT);
        if (u.contains("tablet") || u.contains("ipad")) return "TABLET";
        if (u.contains("mobi") || u.contains("android") || (width != null && width < 768)) return "MOBILE";
        return "DESKTOP";
    }

    private static String detectBrowser(String ua) {
        String u = ua == null ? "" : ua.toLowerCase(Locale.ROOT);
        if (u.contains("edg/")) return "Edge";
        if (u.contains("chrome")) return "Chrome";
        if (u.contains("firefox")) return "Firefox";
        if (u.contains("safari")) return "Safari";
        return "Other";
    }

    private static String detectOs(String ua) {
        String u = ua == null ? "" : ua.toLowerCase(Locale.ROOT);
        if (u.contains("windows")) return "Windows";
        if (u.contains("mac os") || u.contains("macintosh")) return "macOS";
        if (u.contains("android")) return "Android";
        if (u.contains("iphone") || u.contains("ipad")) return "iOS";
        if (u.contains("linux")) return "Linux";
        return "Other";
    }
}
