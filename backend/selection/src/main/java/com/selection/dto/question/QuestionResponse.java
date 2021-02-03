package com.selection.dto.question;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.question.Question;
import lombok.Getter;

@Getter
public class QuestionResponse {

    private Long id;
    private String description;

    @JsonCreator
    public QuestionResponse(String description) {
        this.description = description;
    }

    public QuestionResponse(Question question) {
        this.id = question.getId();
        this.description = question.getDescription();
    }
}
