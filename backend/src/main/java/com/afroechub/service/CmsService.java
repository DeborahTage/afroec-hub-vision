package com.afroechub.service;

import com.afroechub.entity.CmsBlogPost;
import com.afroechub.entity.CmsPage;
import com.afroechub.enums.CmsPublishStatus;

import java.util.List;

public interface CmsService {
    CmsPage getPage(String key);
    List<CmsPage> listPages();
    CmsPage upsertPage(String key, String title, String content, String metaTitle, String metaDescription, Boolean published);

    List<CmsBlogPost> listPublishedPosts();
    CmsBlogPost getPublishedPost(String slug);
    List<CmsBlogPost> listAllPosts();
    CmsBlogPost getPost(Long id);
    CmsBlogPost createPost(CmsBlogPost post);
    CmsBlogPost updatePost(Long id, CmsBlogPost post);
    void deletePost(Long id);
}
