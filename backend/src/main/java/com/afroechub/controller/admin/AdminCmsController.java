package com.afroechub.controller.admin;

import com.afroechub.entity.CmsBlogPost;
import com.afroechub.enums.CmsPublishStatus;
import com.afroechub.service.CmsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/cms")
public class AdminCmsController {

    private final CmsService cmsService;
    private final AdminSupport support;

    public AdminCmsController(CmsService cmsService, AdminSupport support) {
        this.cmsService = cmsService;
        this.support = support;
    }

    @GetMapping("/pages")
    public String pages(Model model) {
        model.addAttribute("pages", cmsService.listPages());
        model.addAttribute("active", "cms");
        return "admin/cms/pages";
    }

    @PostMapping("/pages/{key}")
    public String upsertPage(@PathVariable String key,
                             @RequestParam(required = false) String title,
                             @RequestParam(required = false) String content,
                             @RequestParam(required = false) String metaTitle,
                             @RequestParam(required = false) String metaDescription,
                             @RequestParam(required = false, defaultValue = "true") Boolean published,
                             HttpServletRequest request) {
        cmsService.upsertPage(key, title, content, metaTitle, metaDescription, published);
        support.audit(request, "UPDATE", "CMS_PAGE", null, "Updated CMS page " + key);
        return "redirect:/admin/cms/pages";
    }

    @GetMapping("/blog")
    public String blog(Model model) {
        model.addAttribute("posts", cmsService.listAllPosts());
        model.addAttribute("active", "cms");
        return "admin/cms/blog";
    }

    @PostMapping("/blog")
    public String createBlog(@RequestParam String title,
                             @RequestParam(required = false) String slug,
                             @RequestParam(required = false) String excerpt,
                             @RequestParam(required = false) String content,
                             @RequestParam(required = false) String author,
                             @RequestParam(required = false) String category,
                             @RequestParam(required = false) CmsPublishStatus status,
                             HttpServletRequest request) {
        CmsBlogPost post = new CmsBlogPost();
        post.setTitle(title);
        post.setSlug(slug);
        post.setExcerpt(excerpt);
        post.setContent(content);
        post.setAuthor(author);
        post.setCategory(category);
        post.setStatus(status != null ? status : CmsPublishStatus.DRAFT);
        var saved = cmsService.createPost(post);
        support.audit(request, "CREATE", "CMS_BLOG", saved.getId(), "Created blog post");
        return "redirect:/admin/cms/blog";
    }

    @PostMapping("/blog/{id}/delete")
    public String deleteBlog(@PathVariable Long id, HttpServletRequest request) {
        cmsService.deletePost(id);
        support.audit(request, "DELETE", "CMS_BLOG", id, "Deleted blog post");
        return "redirect:/admin/cms/blog";
    }
}
