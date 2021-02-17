package com.selection.dto.question;

import com.selection.domain.article.Choice;
import lombok.Getter;

@Getter
public class ChoiceResponse {

    private final Long id;
    private final String content;

    public ChoiceResponse(Choice question) {
        this.id = question.getId();
        this.content = question.getContent();
    }
}
