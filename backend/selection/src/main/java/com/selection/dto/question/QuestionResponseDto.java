package com.selection.dto.question;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.question.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestionResponseDto {
    private String description;

    @JsonCreator
    public QuestionResponseDto(String description) {
        this.description = description;
    }

    public QuestionResponseDto(Question question) {
        this.description = question.getDescription();
    }
}
