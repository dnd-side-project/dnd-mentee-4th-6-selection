package com.selection.dto.question;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.article.Article;
import com.selection.domain.question.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
public class QuestionSaveRequest {

  private String description;

  @JsonCreator
  public QuestionSaveRequest(String description) {
    this.description = description;
  }

  public Question toEntity(Article article) {
    return Question.builder()
        .description(description)
        .article(article)
        .build();
  }
}
