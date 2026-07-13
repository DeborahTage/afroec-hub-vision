package com.afroechub.service.impl;

import com.afroechub.dto.request.NewsletterSubscriptionRequest;
import com.afroechub.entity.NewsletterSubscriber;
import com.afroechub.exception.DuplicateResourceException;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.NewsletterSubscriberRepository;
import com.afroechub.service.NewsletterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class NewsletterServiceImpl implements NewsletterService {

    private final NewsletterSubscriberRepository repository;

    public NewsletterServiceImpl(NewsletterSubscriberRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public NewsletterSubscriber subscribe(NewsletterSubscriptionRequest request) {
        String email = request.email().toLowerCase().trim();
        NewsletterSubscriber existing = repository.findByEmailIgnoreCase(email).orElse(null);
        if (existing != null) {
            if (Boolean.TRUE.equals(existing.getActive())) {
                throw new DuplicateResourceException("This email is already subscribed");
            }
            existing.setActive(true);
            existing.setSubscribedAt(LocalDateTime.now());
            existing.setUnsubscribedAt(null);
            return repository.save(existing);
        }
        NewsletterSubscriber s = new NewsletterSubscriber();
        s.setEmail(email);
        s.setActive(true);
        s.setSubscribedAt(LocalDateTime.now());
        s.setUnsubscribeToken(UUID.randomUUID().toString());
        return repository.save(s);
    }

    @Transactional
    @Override
    public void unsubscribe(String token) {
        NewsletterSubscriber s = repository.findByUnsubscribeToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid unsubscribe token"));
        deactivate(s);
    }


    private void deactivate(NewsletterSubscriber s) {
        s.setActive(false);
        s.setUnsubscribedAt(LocalDateTime.now());
        repository.save(s);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<NewsletterSubscriber> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
