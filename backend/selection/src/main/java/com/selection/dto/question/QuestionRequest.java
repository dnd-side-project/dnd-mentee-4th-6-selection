package com.selection.dto.question;

import com.selection.domain.article.Article;
import com.selection.domain.question.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;


@NoArgsConstructor
@Getter
public class QuestionRequest {

    private Long id;
    private String content = Strings.EMPTY;

    @Builder
    public QuestionRequest(String content) {
        this.content = content;
    }

    public Question toEntity(Article article) {
        return Question.builder()
            .content(content)
            .article(article)
            .build();
    }
}
