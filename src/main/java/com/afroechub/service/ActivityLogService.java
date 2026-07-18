package com.afroechub.service;

import com.afroechub.entity.ActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ActivityLogService {

    void log(Long adminUserId, String action, String entityType, Long entityId, String details, String ipAddress);

    Page<ActivityLog> findAll(Pageable pageable);

    List<ActivityLog> recent();
}
