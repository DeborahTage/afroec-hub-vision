package com.afroechub.repository;

import com.afroechub.entity.VisitorAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitorAnalyticsRepository extends JpaRepository<VisitorAnalytics, Long> {

    long countByCreatedAtAfter(LocalDateTime after);

    @Query("select count(distinct coalesce(v.sessionId, v.ipHash)) from VisitorAnalytics v where v.createdAt >= :after")
    long countDistinctVisitorAfter(@Param("after") LocalDateTime after);

    @Query("select v.pageUrl, count(v) from VisitorAnalytics v group by v.pageUrl order by count(v) desc")
    List<Object[]> popularPages();

    @Query("select v.pageUrl, count(v) from VisitorAnalytics v where v.createdAt >= :after group by v.pageUrl order by count(v) desc")
    List<Object[]> popularPagesSince(@Param("after") LocalDateTime after);

    @Query("select coalesce(v.referrer, 'direct'), count(v) from VisitorAnalytics v group by coalesce(v.referrer, 'direct') order by count(v) desc")
    List<Object[]> trafficSources();

    @Query("select coalesce(v.referrer, 'direct'), count(v) from VisitorAnalytics v where v.createdAt >= :after group by coalesce(v.referrer, 'direct') order by count(v) desc")
    List<Object[]> trafficSourcesSince(@Param("after") LocalDateTime after);

    @Query("select coalesce(v.country, 'Unknown'), count(v) from VisitorAnalytics v group by coalesce(v.country, 'Unknown') order by count(v) desc")
    List<Object[]> geoBreakdown();

    @Query("select coalesce(v.country, 'Unknown'), count(v) from VisitorAnalytics v where v.createdAt >= :after group by coalesce(v.country, 'Unknown') order by count(v) desc")
    List<Object[]> geoBreakdownSince(@Param("after") LocalDateTime after);

    @Query("select coalesce(v.deviceType, 'Unknown'), count(v) from VisitorAnalytics v group by coalesce(v.deviceType, 'Unknown')")
    List<Object[]> deviceBreakdown();

    @Query("select coalesce(v.deviceType, 'Unknown'), count(v) from VisitorAnalytics v where v.createdAt >= :after group by coalesce(v.deviceType, 'Unknown') order by count(v) desc")
    List<Object[]> deviceBreakdownSince(@Param("after") LocalDateTime after);
}
