package com.selection.dto.article;

import com.selection.domain.article.Article;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ArticleSearchResponse {
    private Long id;
    private String title;
    private String content;
    private String nickname;
    private LocalDateTime createdAt;

    public ArticleSearchResponse(Article article, String nickname) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.nickname = nickname;
        this.createdAt = article.getCreatedAt();
    }
}
