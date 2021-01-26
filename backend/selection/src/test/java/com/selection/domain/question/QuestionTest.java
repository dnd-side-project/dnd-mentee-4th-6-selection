package com.selection.domain.question;

import com.selection.domain.article.Article;
import com.selection.repository.ArticleRepository;
import com.selection.repository.QuestionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class QuestionTest {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    @DisplayName("선택지 등록 테스트")
    public void createQuestion() {
        // given
        String articleTitle = "설문지1";
        String articleContent = "질문 내용";

        Article article = Article.builder().title(articleTitle).content(articleContent).build();

        String description1 = "선택지 1";
        String description2 = "선택지 2";

        Question question1 = Question.builder().description(description1).article(article).build();
        article.addQuestions(question1);
        articleRepository.save(article);

        // when'
        List<Question> questions = questionRepository.findAll();
        Question loadQuestion1 = questions.get(0);

        // then
        assertThat(loadQuestion1.getDescription()).isEqualTo(description1);
        assertThat(loadQuestion1.getArticle().getTitle()).isEqualTo(articleTitle);

        assertThat(loadQuestion1.getArticle().getQuestions().size()).isEqualTo(1);
    }

}