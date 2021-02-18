package com.selection.dto.goguma;

import com.selection.domain.article.Goguma;
import com.selection.domain.article.GogumaType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GogumaResponse {

    private Long id;
    private String message;
    private GogumaType type;
    private String author;

    public GogumaResponse(Goguma goguma) {
        this.id = goguma.getId();
        this.message = goguma.getMessage();
        this.type = goguma.getType();
        this.author = goguma.getAuthor();
    }
}
