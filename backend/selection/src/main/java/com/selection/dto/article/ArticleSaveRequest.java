package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.question.QuestionSaveRequest;
import com.selection.dto.tag.TagSaveRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleSaveRequest {

    private String title;
    private String content;
    private List<QuestionSaveRequest> questions;
    private List<TagSaveRequest> tags;

    @Builder
    public ArticleSaveRequest(String title, String content, List<QuestionSaveRequest> questions,
        List<TagSaveRequest> tags) {
        this.title = title;
        this.content = content;
        this.questions = questions;
        this.tags = tags;
    }

    public Article toEntity() {
        Article article = Article.builder()
            .title(title)
            .content(content)
            .author("애플")
            .build();

        article.getQuestions().addAll(questions.stream().map(question -> question.toEntity(article))
            .collect(Collectors.toList()));
        article.getTags()
            .addAll(tags.stream().map(tag -> tag.toEntity(article)).collect(Collectors.toList()));
        return article;
    }
}
