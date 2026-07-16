package com.afroechub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cms_pages", indexes = {
        @Index(name = "idx_cms_pages_key", columnList = "page_key", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
public class CmsPage extends BaseEntity {

    @Column(name = "page_key", nullable = false, unique = true, length = 100)
    private String pageKey;

    @Column(length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "meta_title", length = 200)
    private String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;

    @Column(name = "is_published", nullable = false)
    private Boolean published = true;
}
