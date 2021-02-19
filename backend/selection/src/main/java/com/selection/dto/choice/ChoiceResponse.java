package com.selection.dto.choice;

import com.selection.domain.article.Choice;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChoiceResponse {

    private Long id;
    private String content;

    public ChoiceResponse(Choice question) {
        this.id = question.getId();
        this.content = question.getContent();
    }
}
