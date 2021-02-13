package com.selection.dto.question;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.question.Question;
import lombok.Getter;

@Getter
public class QuestionResponse {

    private final Long id;
    private final String content;

    public QuestionResponse(Question question) {
        this.id = question.getId();
        this.content = question.getContent();
    }
}
