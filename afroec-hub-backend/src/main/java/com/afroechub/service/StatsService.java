package com.afroechub.service;

import com.afroechub.dto.response.DashboardStatsResponse;
import com.afroechub.dto.response.StatsResponse;

public interface StatsService {

    StatsResponse publicStats();

    DashboardStatsResponse dashboardStats();
}
