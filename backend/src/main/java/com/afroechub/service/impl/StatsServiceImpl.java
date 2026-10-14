package com.afroechub.service.impl;

import com.afroechub.dto.response.DashboardStatsResponse;
import com.afroechub.dto.response.StatsResponse;
import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.PartnerStatus;
import com.afroechub.enums.VolunteerStatus;
import com.afroechub.repository.ContactSubmissionRepository;
import com.afroechub.repository.NewsletterSubscriberRepository;
import com.afroechub.repository.PartnerInquiryRepository;
import com.afroechub.repository.StudentApplicationRepository;
import com.afroechub.repository.VolunteerApplicationRepository;
import com.afroechub.service.StatsService;
import com.afroechub.util.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class StatsServiceImpl implements StatsService {

    private final StudentApplicationRepository applicationRepository;
    private final PartnerInquiryRepository partnerRepository;
    private final VolunteerApplicationRepository volunteerRepository;
    private final ContactSubmissionRepository contactRepository;
    private final NewsletterSubscriberRepository newsletterRepository;

    public StatsServiceImpl(StudentApplicationRepository applicationRepository,
                            PartnerInquiryRepository partnerRepository,
                            VolunteerApplicationRepository volunteerRepository,
                            ContactSubmissionRepository contactRepository,
                            NewsletterSubscriberRepository newsletterRepository) {
        this.applicationRepository = applicationRepository;
        this.partnerRepository = partnerRepository;
        this.volunteerRepository = volunteerRepository;
        this.contactRepository = contactRepository;
        this.newsletterRepository = newsletterRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public StatsResponse publicStats() {
        long activePartners = partnerRepository.countByStatus(PartnerStatus.ACTIVE);
        long activeVolunteers = volunteerRepository.countByStatus(VolunteerStatus.ACCEPTED);
        // Only documented figures are published. Blank or zero fields are not reported outcomes.
        return new StatsResponse(
                490,
                0,
                "",
                "",
                0,
                0,
                activePartners,
                activeVolunteers
        );
    }

    @Transactional(readOnly = true)
    @Override
    public DashboardStatsResponse dashboardStats() {
        long total = applicationRepository.count();
        long newToday = applicationRepository.countByCreatedAtAfter(DateUtil.startOfToday());
        long pending = applicationRepository.countByStatus(ApplicationStatus.PENDING);
        long accepted = applicationRepository.countByStatus(ApplicationStatus.ACCEPTED);
        long rejected = applicationRepository.countByStatus(ApplicationStatus.REJECTED);

        Map<String, Long> byProgram = toMap(applicationRepository.countGroupedByProgramType());
        Map<String, Long> byGender = toMap(applicationRepository.countGroupedByGender());
        Map<String, Long> byStatus = toMap(applicationRepository.countGroupedByStatus());

        List<DashboardStatsResponse.TimeSeriesPoint> overTime = last6Months();

        return new DashboardStatsResponse(
                total,
                newToday,
                pending,
                accepted,
                rejected,
                partnerRepository.count(),
                volunteerRepository.count(),
                contactRepository.count(),
                newsletterRepository.countByActiveTrue(),
                byProgram,
                byGender,
                byStatus,
                overTime
        );
    }

    private Map<String, Long> toMap(List<Object[]> rows) {
        Map<String, Long> map = new LinkedHashMap<>();
        for (Object[] row : rows) {
            String key = row[0] == null ? "UNKNOWN" : row[0].toString();
            map.put(key, ((Number) row[1]).longValue());
        }
        return map;
    }

    private List<DashboardStatsResponse.TimeSeriesPoint> last6Months() {
        List<DashboardStatsResponse.TimeSeriesPoint> points = new java.util.ArrayList<>();
        LocalDate now = LocalDate.now();
        for (int i = 5; i >= 0; i--) {
            LocalDate monthStart = now.minusMonths(i).withDayOfMonth(1);
            LocalDate monthEnd = monthStart.plusMonths(1);
            long count = applicationRepository.countByCreatedAtBetween(
                    monthStart.atStartOfDay(), monthEnd.atStartOfDay());
            String label = monthStart.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
                    + " " + monthStart.getYear();
            points.add(new DashboardStatsResponse.TimeSeriesPoint(label, count));
        }
        return points;
    }
}
