package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.question.ChoiceResponse;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ArticleResponse {

    private Long id;
    private String title;
    private String content;
    private String author;
    private Long numOfShared;

    private List<ChoiceResponse> choices = new ArrayList<>();
    private LocalDateTime createdAt;

    public ArticleResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.numOfShared = article.getNumOfShared();
        this.author = article.getAuthor();
        this.choices.addAll(article.toChoicesResponse());
        this.createdAt = article.getCreatedAt();
    }
}
