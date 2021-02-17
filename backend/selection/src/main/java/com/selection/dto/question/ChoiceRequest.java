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
    @Size(min = 1, max = 30,message = "선택지는 최소 1자 이상, 최대 30자이하만 가능합니다.")
    private String content;

    public ChoiceRequest(String content) {
        this.content = content;
    }

    public Choice toEntity(Article article) {
        return new Choice(content, article);
    }
}
