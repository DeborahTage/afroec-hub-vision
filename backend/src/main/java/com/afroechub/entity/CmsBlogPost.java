package com.afroechub.entity;

import com.afroechub.enums.CmsPublishStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "cms_blog_posts", indexes = {
        @Index(name = "idx_cms_blog_slug", columnList = "slug", unique = true),
        @Index(name = "idx_cms_blog_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
public class CmsBlogPost extends BaseEntity {

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String excerpt;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "featured_image", length = 500)
    private String featuredImage;

    @Column(length = 200)
    private String author;

    @Column(length = 100)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(name = "meta_title", length = 200)
    private String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CmsPublishStatus status = CmsPublishStatus.DRAFT;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
}
