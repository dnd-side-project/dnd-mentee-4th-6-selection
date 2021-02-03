package com.selection.domain.article;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.selection.repository.ArticleRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class ArticleTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    @DisplayName("게시글 생성 테스트")
    public void createArticle() {
        // given
        final String title = "게시글 1";
        final String content = "게시글 내용";
        final String author = "애플";
        final String defaultBackgroundColor = "#FFFFFF";

        Article article = Article.builder()
            .title(title)
            .content(content)
            .author(author)
            .build();

        articleRepository.save(article);

        // when
        Article latestArticle = articleRepository.findAll().get(0);

        // then
        assertThat(latestArticle.getTitle()).isEqualTo(title);
        assertThat(latestArticle.getContent()).isEqualTo(content);
        assertThat(latestArticle.getBackgroundColor()).isEqualTo(defaultBackgroundColor);
        assertThat(latestArticle.getAuthor()).isEqualTo(author);
    }

    @AfterEach
    public void cleanUp() {
        articleRepository.deleteAll();
    }
}
