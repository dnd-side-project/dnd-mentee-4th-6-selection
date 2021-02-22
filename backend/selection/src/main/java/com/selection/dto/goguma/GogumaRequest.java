package com.selection.dto.goguma;

import com.selection.domain.article.Article;
import com.selection.domain.article.Goguma;
import com.selection.domain.article.GogumaType;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GogumaRequest {

    @ApiModelProperty(notes = "고구마 타입", required = true, example = "HAPPY")
    private GogumaType gogumaType;

    @ApiModelProperty(notes = "쪽지 내용(최대 30자이하)", required = true, example = "힘내세요!")
    @NotNull
    @Size(max = 30, message = "고구마 쪽지 내용은 최대 30자이하입니다.")
    private String message;

    public GogumaRequest(
        GogumaType gogumaType,
        @NotNull @Size(max = 30, message = "고구마 쪽지 내용은 최대 30자이하입니다.") String message) {
        this.gogumaType = gogumaType;
        this.message = message;
    }

    public Goguma toEntity(@NotEmpty(message = "작성자는 필수입니다.") String userId,
        @NotNull(message = "속한 게시글은 필수입니다.") Article article) {
        return new Goguma(message, gogumaType, userId, article);
    }
}
