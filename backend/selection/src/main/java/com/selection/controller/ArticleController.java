package com.selection.controller;

import com.selection.dto.article.ArticleLatestResponse;
import com.selection.dto.article.ArticleRequest;
import com.selection.dto.article.ArticleResponse;
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
    public ResponseEntity<Long> createArticle(@RequestBody ArticleRequest requestDto) {
        Long articleId = articleService.create(requestDto);
        return ResponseEntity.ok(articleId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> modifyArticle(@PathVariable Long id,
        @RequestBody ArticleRequest requestDto) {
        ArticleResponse article = articleService.modify(id, requestDto);
        return ResponseEntity.ok(article);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> lookUpArticle(@PathVariable Long id) {
        ArticleResponse article = articleService.lookUp(id);
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteArticle(@PathVariable Long id) {
        Long articleId = articleService.delete(id);
        return ResponseEntity.ok(articleId);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ArticleLatestResponse>> getLatestArticles() {
        final Long NUM_OF_LATEST_ARTICLES = 10L;
        List<ArticleLatestResponse> latestArticles = articleService
            .lookUpLatest(NUM_OF_LATEST_ARTICLES);
        return ResponseEntity.ok(latestArticles);
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<ArticleResponse>> getFavoriteArticles() {
        return null;
    }
}
