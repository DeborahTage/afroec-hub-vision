package com.afroechub.dto.response;

import java.util.List;
import java.util.Map;

/**
 * Aggregated stats used by the admin dashboard cards & charts.
 */
public record DashboardStatsResponse(
        long totalApplications,
        long newApplicationsToday,
        long pendingReview,
        long accepted,
        long rejected,
        long totalPartners,
        long totalVolunteers,
        long totalContacts,
        long newsletterSubscribers,
        Map<String, Long> applicationsByProgram,
        Map<String, Long> applicationsByGender,
        Map<String, Long> applicationsByStatus,
        List<TimeSeriesPoint> applicationsOverTime
) {
    public record TimeSeriesPoint(String label, long count) {
    }
}
