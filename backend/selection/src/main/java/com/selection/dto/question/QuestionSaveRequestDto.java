package com.selection.dto.question;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.article.Article;
import com.selection.domain.question.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


@NoArgsConstructor
@Getter
public class QuestionSaveRequestDto {

    private String description;

    @JsonCreator
    public QuestionSaveRequestDto(String description) {
        this.description = description;
    }

    public Question toEntity(Article article) {
        return Question.builder()
                .description(description)
                .article(article)
                .build();
    }
}
