package com.afroechub.controller.api;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.CmsBlogPost;
import com.afroechub.entity.CmsPage;
import com.afroechub.service.CmsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cms")
@Tag(name = "CMS Public")
public class CmsController {

    private final CmsService cmsService;

    public CmsController(CmsService cmsService) {
        this.cmsService = cmsService;
    }

    @GetMapping("/pages/{key}")
    public ResponseEntity<ApiResponse<CmsPage>> page(@PathVariable String key) {
        CmsPage page = cmsService.getPage(key);
        if (!Boolean.TRUE.equals(page.getPublished())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ApiResponse.ok("OK", page));
    }

    @GetMapping("/blog")
    public ResponseEntity<ApiResponse<List<CmsBlogPost>>> blog() {
        return ResponseEntity.ok(ApiResponse.ok("OK", cmsService.listPublishedPosts()));
    }

    @GetMapping("/blog/{slug}")
    public ResponseEntity<ApiResponse<CmsBlogPost>> blogPost(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok("OK", cmsService.getPublishedPost(slug)));
    }
}
