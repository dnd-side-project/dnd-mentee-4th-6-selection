package com.selection.dto.question;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.question.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class QuestionResponseDto {

    private Long id;
    private String description;

    @JsonCreator
    public QuestionResponseDto(String description) {
        this.description = description;
    }

    public QuestionResponseDto(Question question) {
        this.id = question.getId();
        this.description = question.getDescription();
    }
}
