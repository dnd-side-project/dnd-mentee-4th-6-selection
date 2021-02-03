package com.selection.controller;

import com.selection.dto.article.ArticleResponse;
import com.selection.dto.article.ArticleSaveRequest;
import com.selection.service.article.ArticleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<ArticleResponse> createArticle(
        @RequestBody ArticleSaveRequest requestDto) {
        ArticleResponse article = articleService.create(requestDto);
        return ResponseEntity.ok(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> modifyArticle(@PathVariable Long id) {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(@PathVariable Long id) {
        ArticleResponse article = articleService.getArticle(id);
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ArticleResponse> deleteArticle(@PathVariable Long id) {
        return null;
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ArticleResponse>> getLatestArticles() {
        return null;
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<ArticleResponse>> getFavoriteArticles() {
        return null;
    }
}
