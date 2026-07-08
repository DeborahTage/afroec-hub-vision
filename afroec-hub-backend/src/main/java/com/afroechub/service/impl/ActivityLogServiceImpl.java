package com.afroechub.service.impl;

import com.afroechub.entity.ActivityLog;
import com.afroechub.repository.ActivityLogRepository;
import com.afroechub.service.ActivityLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {

    private final ActivityLogRepository repository;

    public ActivityLogServiceImpl(ActivityLogRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public void log(Long adminUserId, String action, String entityType,
                    Long entityId, String details, String ipAddress) {
        ActivityLog entry = new ActivityLog();
        entry.setAdminUserId(adminUserId);
        entry.setAction(action);
        entry.setEntityType(entityType);
        entry.setEntityId(entityId);
        entry.setDetails(details);
        entry.setIpAddress(ipAddress);
        repository.save(entry);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<ActivityLog> findAll(Pageable pageable) {
        return repository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ActivityLog> recent() {
        return repository.findTop10ByOrderByCreatedAtDesc();
    }
}
