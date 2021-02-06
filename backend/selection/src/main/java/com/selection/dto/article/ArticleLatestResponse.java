package com.selection.dto.article;

import com.selection.domain.article.Article;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleLatestResponse {
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;

    public ArticleLatestResponse(Article article) {
        this.title = article.getTitle();
        this.content = article.getContent();
        this.author = article.getAuthor();
        this.createdAt = article.getCreatedAt();
    }
}
