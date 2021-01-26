package com.selection.controller.article;

import com.selection.dto.article.ArticleResponseDto;
import com.selection.dto.article.ArticleSaveRequestDto;
import com.selection.service.article.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ArticleApiController {

    private final ArticleService articleService;

    @PostMapping("/api/article")
    public ArticleResponseDto createArticle(@RequestBody ArticleSaveRequestDto requestDto) {
        return articleService.create(requestDto);
    }
}
