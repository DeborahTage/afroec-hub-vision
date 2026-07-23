package com.afroechub.service;

import com.afroechub.dto.request.AnalyticsTrackRequest;

import java.util.List;
import java.util.Map;

public interface AnalyticsService {
    void track(AnalyticsTrackRequest request, String ipAddress);

    Map<String, Object> overview(int days);

    List<Map<String, Object>> daily(int days);
}
