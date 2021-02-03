package com.selection.domain.question;

import static org.assertj.core.api.Assertions.assertThat;

import com.selection.domain.article.Article;
import com.selection.repository.ArticleRepository;
import com.selection.repository.QuestionRepository;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class QuestionTest {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    @DisplayName("질문지 등록 테스트")
    public void createQuestion() {
        // given
        final String title = "게시글 1";
        final String content = "게시글 내용";
        final String author = "애플";
        final String questionDescription = "질문지 1";

        Article article = Article.builder()
            .title(title)
            .content(content)
            .author(author)
            .build();

        Question question1 = Question.builder()
            .description(questionDescription)
            .article(article)
            .build();

        article.getQuestions().add(question1);
        articleRepository.save(article);

        // when
        List<Question> questions = questionRepository.findAll();
        Question loadQuestion1 = questions.get(0);

        // then
        assertThat(loadQuestion1.getDescription()).isEqualTo(questionDescription);
        assertThat(loadQuestion1.getArticle().getTitle()).isEqualTo(title);
    }

    @AfterEach
    public void cleanUp() {
        articleRepository.deleteAll();
    }
}