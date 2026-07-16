package com.afroechub.repository;

import com.afroechub.entity.CmsBlogPost;
import com.afroechub.enums.CmsPublishStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CmsBlogPostRepository extends JpaRepository<CmsBlogPost, Long> {
    Optional<CmsBlogPost> findBySlug(String slug);
    List<CmsBlogPost> findByStatusOrderByPublishedAtDesc(CmsPublishStatus status);
    List<CmsBlogPost> findAllByOrderByUpdatedAtDesc();
}
