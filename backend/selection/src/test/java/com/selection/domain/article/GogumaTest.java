package com.selection.domain.article;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

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
        final String userIdOfArticleWriter = "delphi3228@pukyong.ac.kr";
        final String userIdOfWriterGoguma = "dnd-4th-6team@gmail.com";
        final GogumaType gogumaType = GogumaType.ANGRY;

        Article article = new Article(title, content, userIdOfArticleWriter);
        Goguma goguma = new Goguma(gogumaType, userIdOfWriterGoguma, article);

        assertThat(goguma.getArticle()).isEqualTo(article);
        assertThat(goguma.getGogumaType()).isEqualTo(gogumaType);
        assertThat(goguma.getUserId()).isEqualTo(userIdOfWriterGoguma);
    }
}