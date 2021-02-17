package com.selection.dto.goguma;

import com.selection.domain.article.Goguma;
import com.selection.domain.article.GogumaType;
import lombok.Getter;

@Getter
public class GogumaResponse {

    private final Long id;
    private final String message;
    private final GogumaType type;

    public GogumaResponse(Goguma goguma) {
        this.id = goguma.getId();
        this.message = goguma.getMessage();
        this.type = goguma.getType();
    }
}
