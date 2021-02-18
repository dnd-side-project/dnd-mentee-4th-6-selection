package com.selection.dto.goguma;

import com.selection.domain.article.Article;
import com.selection.domain.article.Goguma;
import com.selection.domain.article.GogumaType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GogumaRequest {

    private GogumaType type;

    @NotNull
    @Size(max=30, message = "고구마 쪽지 내용은 최대 30자이하입니다.")
    private String message;

    public GogumaRequest(
        GogumaType type,
        @NotNull @Size(max = 30, message = "고구마 쪽지 내용은 최대 30자이하입니다.") String message) {
        this.type = type;
        this.message = message;
    }

    public Goguma toEntity(@NotEmpty(message = "작성자는 필수입니다.") String author, @NotNull(message = "속한 게시글은 필수입니다.") Article article) {
        return new Goguma(message, type, author,article);
    }
}
