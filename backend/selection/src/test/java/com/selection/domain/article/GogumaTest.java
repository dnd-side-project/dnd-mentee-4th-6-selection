package com.selection.domain.article;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GogumaTest {

    @Test
    @DisplayName("고구마 도메인 테스트")
    public void createGoguma() {
        // given
        final String title = "제목 1";
        final String content = "내용 1";
        final String author = "애플";
        final String anotherAuthor = "히히";
        final GogumaType type = GogumaType.ANGRY;

        Article article = new Article(title, content, author);
        Goguma goguma = new Goguma(type, anotherAuthor, article);

        assertThat(goguma.getArticle()).isEqualTo(article);
        assertThat(goguma.getType()).isEqualTo(type);
        assertThat(goguma.getAuthor()).isEqualTo(anotherAuthor);
    }
}