package com.selection.dto.choice;

import com.selection.domain.article.Choice;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChoiceResponse {

    @ApiModelProperty(notes = "선택지 번호", required = true, example = "1")
    private Long id;
    @ApiModelProperty(notes = "내용", required = true, example = "선택지 1")
    private String content;

    public ChoiceResponse(Choice question) {
        this.id = question.getId();
        this.content = question.getContent();
    }
}
