package com.selection.domain.question;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.selection.domain.article.Article;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class QuestionTest {

    @Test
    @DisplayName("Question 생성")
    public void createQuestion() {
        // given
        final String articleTitle = "게시글 1";
        final String articleContent = "게시글 내용";
        final String author = "애플";
        final String backgroundColor = "#ff3399";
        final String questionContent = "질문질문";

        Article article = Article.builder()
            .title(articleTitle)
            .content(articleContent)
            .author(author)
            .backgroundColor(backgroundColor)
            .build();

        // when
        Question question = Question.builder()
            .content(questionContent)
            .article(article)
            .build();

        // then
        assertThat(question.getContent()).isEqualTo(questionContent);
        assertThat(question.getArticle().getTitle()).isEqualTo(articleTitle);
    }

    @Test
    @DisplayName("Question 생성 - 필수 파라미터 누락시 예외처리")
    public void createQuestion_IfRequiredParamIsOmmited_ThrowException() {
        // given
        final String articleTitle = "게시글 1";
        final String articleContent = "게시글 내용";
        final String author = "애플";
        final String backgroundColor = "#ff3399";
        final String questionContent = "질문질문";

        Article article = Article.builder()
            .title(articleTitle)
            .content(articleContent)
            .author(author)
            .backgroundColor(backgroundColor)
            .build();

        // when
        assertThatThrownBy(() -> Question.builder()
            .content(questionContent)
            .build()).isInstanceOf(IllegalArgumentException.class);
    }
}