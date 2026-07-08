package com.afroechub.service;

import com.afroechub.dto.request.NewsletterSubscriptionRequest;
import com.afroechub.entity.NewsletterSubscriber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NewsletterService {

    NewsletterSubscriber subscribe(NewsletterSubscriptionRequest request);

    void unsubscribe(String token);

    void unsubscribeByEmail(String email);

    Page<NewsletterSubscriber> findAll(Pageable pageable);
}
