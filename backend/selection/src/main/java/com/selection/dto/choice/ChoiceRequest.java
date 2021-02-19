package com.selection.dto.choice;

import com.selection.domain.article.Article;
import com.selection.domain.article.Choice;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
public class ChoiceRequest {

    @ApiModelProperty(notes = "선택지 번호(수정시 수정하고자 하는 선택지 번호, 추가시 음수로 감소)", required = true, example = "-1")
    private Long id = -1L;

    @ApiModelProperty(notes = "내용(최소 1자이상, 최대30자이하)", required = true, example = "선택지 1")
    @NotNull
    @Size(min = 1, max = 30, message = "선택지 내용은 최소 1자이상, 최대 30자이하만 가능합니다.")
    private String content;

    public ChoiceRequest(String content) {
        this.content = content;
    }

    public Choice toEntity(Article article) {
        return new Choice(content, article);
    }
}
