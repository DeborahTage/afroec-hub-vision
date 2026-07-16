package com.afroechub.controller.admin;

import com.afroechub.dto.response.ApiResponse;
import com.afroechub.entity.CmsBlogPost;
import com.afroechub.entity.CmsPage;
import com.afroechub.service.CmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/cms")
public class AdminApiCmsController {
    private final CmsService cmsService;
    public AdminApiCmsController(CmsService cmsService) { this.cmsService = cmsService; }
    @GetMapping("/pages") public ResponseEntity<ApiResponse<List<CmsPage>>> pages() { return ResponseEntity.ok(ApiResponse.ok("OK", cmsService.listPages())); }
    @PutMapping("/pages/{key}") public ResponseEntity<ApiResponse<CmsPage>> updatePage(@PathVariable String key, @RequestBody Map<String, Object> body) { return ResponseEntity.ok(ApiResponse.ok("Updated", cmsService.upsertPage(key, (String) body.get("title"), (String) body.get("content"), (String) body.get("metaTitle"), (String) body.get("metaDescription"), (Boolean) body.get("published")))); }
    @GetMapping("/blog") public ResponseEntity<ApiResponse<List<CmsBlogPost>>> blog() { return ResponseEntity.ok(ApiResponse.ok("OK", cmsService.listAllPosts())); }
    @PostMapping("/blog") public ResponseEntity<ApiResponse<CmsBlogPost>> createBlog(@RequestBody CmsBlogPost post) { return ResponseEntity.ok(ApiResponse.ok("Created", cmsService.createPost(post))); }
    @DeleteMapping("/blog/{id}") public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable Long id) { cmsService.deletePost(id); return ResponseEntity.ok(ApiResponse.ok("Deleted")); }
}
