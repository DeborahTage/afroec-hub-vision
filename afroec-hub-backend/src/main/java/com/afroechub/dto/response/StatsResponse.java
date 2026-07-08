package com.afroechub.dto.response;

/**
 * Public stats surfaced on the marketing website.
 */
public record StatsResponse(
        int studentsReached,
        int annualGraduates,
        String womenInTech,
        String placementRate,
        int partnerSchools,
        int digisecTrucks,
        long activePartners,
        long activeVolunteers
) {
}
