package com.selection.controller;

import com.selection.dto.article.ArticleLatestResponse;
import com.selection.dto.article.ArticleRequest;
import com.selection.dto.article.ArticleResponse;
import com.selection.service.article.ArticleService;
import java.util.List;
import javax.validation.Valid;
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
    public ResponseEntity<Long> createArticle(@RequestBody @Valid ArticleRequest requestDto) {
        return ResponseEntity.ok(articleService.create(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> modifyArticle(@PathVariable Long id,
        @RequestBody @Valid ArticleRequest requestDto) {
        return ResponseEntity.ok(articleService.modify(id, requestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> lookUpArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.lookUp(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ArticleLatestResponse>> getLatestArticles() {
        final Long NUM_OF_LATEST_ARTICLES = 10L;
        return ResponseEntity
            .ok(articleService.lookUpLatest(NUM_OF_LATEST_ARTICLES));
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<ArticleResponse>> getFavoriteArticles() {
        return null;
    }
}
