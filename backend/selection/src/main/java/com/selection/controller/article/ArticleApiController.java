package com.selection.controller.article;

import com.selection.dto.article.ArticleResponse;
import com.selection.dto.article.ArticleSaveRequest;
import com.selection.dto.notice.PageRequest;
import com.selection.service.article.ArticleService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api")
public class ArticleApiController {

  private final ArticleService articleService;

  @PostMapping("/article")
  public ResponseEntity<ArticleResponse> createArticle(@RequestBody ArticleSaveRequest requestDto) {
    ArticleResponse article = articleService.create(requestDto);
    return ResponseEntity.ok(article);
  }

  @PutMapping({"/article/", "/article/{id}"})
  public ResponseEntity<ArticleResponse> modifyArticle(@PathVariable Optional<Long> id) {
    return null;
  }

  @GetMapping({"/article/", "/article/{id}"})
  public ResponseEntity<ArticleResponse> getArticle(@PathVariable Optional<Long> id) {

    if (!id.isPresent()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    ArticleResponse article = articleService.getArticle(id.get());
    return ResponseEntity.ok(article);
  }

  @GetMapping("/articles")
  public ResponseEntity<List<ArticleResponse>> getArticles(PageRequest pageRequest) {
    return null;
  }

  @DeleteMapping({"/article", "/article/{id}"})
  public ResponseEntity<ArticleResponse> deleteArticle(@PathVariable Optional<Long> id) {
    return null;
  }

  @GetMapping("/articles/latest")
  public ResponseEntity<List<ArticleResponse>> getLatestArticles() {
    return null;
  }

  @GetMapping("/articles/favorite")
  public ResponseEntity<List<ArticleResponse>> getFavoriteArticles() {
    return null;
  }


}
