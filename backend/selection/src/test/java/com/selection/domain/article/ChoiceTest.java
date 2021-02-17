package com.selection.domain.article;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChoiceTest {

    @Test
    @DisplayName("질문지 도메인 테스트")
    public void createChoice() {
        // given
        final String title = "제목 1";
        final String content = "내용 1";
        final String author = "애플";
        final String choiceContent1 = "선택지 1";

        Article article = new Article(title, content, author);

        Choice choice = new Choice(choiceContent1, article);

        assertThat(choice.getArticle()).isEqualTo(article);
        assertThat(choice.getContent()).isEqualTo(choiceContent1);
    }

}