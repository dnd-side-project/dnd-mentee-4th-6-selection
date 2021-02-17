package com.selection.dto.question;

import com.selection.domain.article.Article;
import com.selection.domain.article.Choice;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
public class ChoiceRequest {

    private Long id = -1L;

    @NotNull
    @Size(min = 1, max = 12,message = "질문지는 최소 1자 이상, 최대 12자이하만 가능합니다.")
    private String content;

    @Builder
    public ChoiceRequest(String content) {
        this.content = content;
    }

    public Choice toEntity(Article article) {
        return new Choice(content, article);
    }
}
