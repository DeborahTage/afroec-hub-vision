package com.afroechub.service.impl;

import com.afroechub.entity.CmsBlogPost;
import com.afroechub.entity.CmsPage;
import com.afroechub.enums.CmsPublishStatus;
import com.afroechub.exception.ResourceNotFoundException;
import com.afroechub.repository.CmsBlogPostRepository;
import com.afroechub.repository.CmsPageRepository;
import com.afroechub.service.CmsService;
import com.afroechub.util.ValidationUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class CmsServiceImpl implements CmsService {

    private final CmsPageRepository pageRepository;
    private final CmsBlogPostRepository blogRepository;

    public CmsServiceImpl(CmsPageRepository pageRepository, CmsBlogPostRepository blogRepository) {
        this.pageRepository = pageRepository;
        this.blogRepository = blogRepository;
    }

    @Override @Transactional(readOnly = true)
    public CmsPage getPage(String key) {
        return pageRepository.findByPageKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("CMS page not found: " + key));
    }

    @Override @Transactional(readOnly = true)
    public List<CmsPage> listPages() { return pageRepository.findAll(); }

    @Override @Transactional
    public CmsPage upsertPage(String key, String title, String content, String metaTitle,
                              String metaDescription, Boolean published) {
        CmsPage page = pageRepository.findByPageKey(key).orElseGet(CmsPage::new);
        page.setPageKey(key);
        page.setTitle(ValidationUtil.sanitizeNullable(title));
        page.setContent(content);
        page.setMetaTitle(ValidationUtil.sanitizeNullable(metaTitle));
        page.setMetaDescription(ValidationUtil.sanitizeNullable(metaDescription));
        if (published != null) page.setPublished(published);
        return pageRepository.save(page);
    }

    @Override @Transactional(readOnly = true)
    public List<CmsBlogPost> listPublishedPosts() {
        return blogRepository.findByStatusOrderByPublishedAtDesc(CmsPublishStatus.PUBLISHED);
    }

    @Override @Transactional(readOnly = true)
    public CmsBlogPost getPublishedPost(String slug) {
        CmsBlogPost post = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found"));
        if (post.getStatus() != CmsPublishStatus.PUBLISHED) {
            throw new ResourceNotFoundException("Blog post not found");
        }
        return post;
    }

    @Override @Transactional(readOnly = true)
    public List<CmsBlogPost> listAllPosts() { return blogRepository.findAllByOrderByUpdatedAtDesc(); }

    @Override @Transactional(readOnly = true)
    public CmsBlogPost getPost(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post", id));
    }

    @Override @Transactional
    public CmsBlogPost createPost(CmsBlogPost post) {
        if (post.getSlug() == null || post.getSlug().isBlank()) {
            post.setSlug(slugify(post.getTitle()));
        }
        if (post.getStatus() == CmsPublishStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }
        return blogRepository.save(post);
    }

    @Override @Transactional
    public CmsBlogPost updatePost(Long id, CmsBlogPost incoming) {
        CmsBlogPost post = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post", id));
        post.setTitle(incoming.getTitle());
        post.setSlug(incoming.getSlug() != null ? incoming.getSlug() : post.getSlug());
        post.setExcerpt(incoming.getExcerpt());
        post.setContent(incoming.getContent());
        post.setFeaturedImage(incoming.getFeaturedImage());
        post.setAuthor(incoming.getAuthor());
        post.setCategory(incoming.getCategory());
        post.setTags(incoming.getTags());
        post.setMetaTitle(incoming.getMetaTitle());
        post.setMetaDescription(incoming.getMetaDescription());
        if (incoming.getStatus() != null) {
            post.setStatus(incoming.getStatus());
            if (incoming.getStatus() == CmsPublishStatus.PUBLISHED && post.getPublishedAt() == null) {
                post.setPublishedAt(LocalDateTime.now());
            }
        }
        return blogRepository.save(post);
    }

    @Override @Transactional
    public void deletePost(Long id) {
        if (!blogRepository.existsById(id)) throw new ResourceNotFoundException("Blog post", id);
        blogRepository.deleteById(id);
    }

    private static String slugify(String input) {
        return input.trim().toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");
    }
}
