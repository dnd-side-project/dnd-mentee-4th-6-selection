package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.question.QuestionRequest;
import com.selection.dto.tag.TagRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleRequest {

    private String title;
    private String content;
    private String backgroundColor;
    private List<QuestionRequest> questions;
    private List<TagRequest> tags;

    @Builder
    public ArticleRequest(String title, String content, String backgroundColor,
        List<QuestionRequest> questions,
        List<TagRequest> tags) {
        this.title = title;
        this.content = content;
        this.backgroundColor = backgroundColor;
        this.questions = questions;
        this.tags = tags;
    }

    public Article toEntity() {
        Article article = Article.builder()
            .title(title)
            .content(content)
            .backgroundColor(backgroundColor)
            .author("애플")
            .build();

        article.getQuestions().addAll(questions.stream().map(question -> question.toEntity(article))
            .collect(Collectors.toList()));
        article.getTags()
            .addAll(tags.stream().map(tag -> tag.toEntity(article)).collect(Collectors.toList()));
        return article;
    }
}
