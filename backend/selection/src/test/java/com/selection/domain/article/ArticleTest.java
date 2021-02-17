package com.selection.domain.article;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ArticleTest {

    @Test
    @DisplayName("게시글 생성")
    public void createArticle() {
        final String title = "게시글 1";
        final String content = "게시글 내용";
        final String author = "애플";
        final String backgroundColor = "#ff3399";

        Article article = Article.builder()
            .title(title)
            .content(content)
            .author(author)
            .backgroundColor(backgroundColor)
            .build();

        assertThat(article.getTitle()).isEqualTo(title);
        assertThat(article.getContent()).isEqualTo(content);
        assertThat(article.getAuthor()).isEqualTo(author);
        assertThat(article.getBackgroundColor()).isEqualTo(backgroundColor);
    }

    @Test
    @DisplayName("게시글 생성 - 필수파라미터")
    public void createArticle_IfRequiredParamIsOmitted_ThrowException() {
        final String title = "게시글 1";
        final String content = "게시글 내용";

        assertThatThrownBy(() -> Article.builder()
            .title(title)
            .content(content)
            .build()).isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("게시글 생성")
    public void createArticle_IfColorIsOmitted_UsingDefultValue() {
        final String title = "게시글 1";
        final String content = "게시글 내용";
        final String author = "애플";

        Article article = Article.builder()
            .title(title)
            .content(content)
            .author(author)
            .build();

        assertThat(article.getTitle()).isEqualTo(title);
        assertThat(article.getContent()).isEqualTo(content);
        assertThat(article.getAuthor()).isEqualTo(author);
        assertThat(article.getBackgroundColor()).isEqualTo("#FFFFFF");
    }
}
