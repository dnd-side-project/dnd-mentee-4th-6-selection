package com.selection.dto.article;

import com.selection.domain.article.Article;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleLatestResponse {

    private final Long id;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;

    public ArticleLatestResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.createdAt = article.getCreatedAt();
    }
}
