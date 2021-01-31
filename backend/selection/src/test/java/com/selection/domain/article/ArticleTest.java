package com.selection.domain.article;

import com.selection.domain.tag.Tag;
import com.selection.repository.ArticleRepository;
import com.selection.repository.TagRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class ArticleTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    @DisplayName("질문지 생성 테스트")
    public void createArticle() {
        // given
        final String articleTitle = "질문지 1";
        final String articleContent = "질문 내용";
        final String author = "애플";
        final String defaultBackgroundColor = "#FFFFFF";

        Article article = Article.builder()
                .title(articleTitle)
                .content(articleContent)
                .author(author)
                .build();

        articleRepository.save(article);

        // when
        Article latestArticle = articleRepository.findAll().get(0);

        // then
        assertThat(latestArticle.getTitle()).isEqualTo(articleTitle);
        assertThat(latestArticle.getContent()).isEqualTo(articleContent);
        assertThat(latestArticle.getBackgroundColor()).isEqualTo(defaultBackgroundColor);
        assertThat(latestArticle.getAuthor()).isEqualTo(author);
    }
}
