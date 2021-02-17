package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.question.ChoiceResponse;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class ArticleResponse {

    private final Long id;
    private final String title;
    private final String content;
    private final String author;
    private final Long numOfShared;

    private final List<ChoiceResponse> choices = new ArrayList<>();
    private final LocalDateTime createdAt;

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
