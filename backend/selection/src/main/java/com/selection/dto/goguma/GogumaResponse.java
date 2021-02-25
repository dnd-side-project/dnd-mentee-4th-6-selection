package com.selection.dto.goguma;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.selection.domain.article.Goguma;
import com.selection.domain.article.GogumaType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GogumaResponse {

    @ApiModelProperty(notes = "고구마 번호", required = true, example = "1")
    private Long id;
    @ApiModelProperty(notes = "쪽지 내용", required = true, example = "공감합니다!")
    private String message;
    @ApiModelProperty(notes = "고구마 타입", required = true, example = "GOOD")
    private GogumaType gogumaType;
    @ApiModelProperty(notes = "작성자 닉네임", required = true, example = "애플")
    private String nickname;
    private boolean isOwner;

    public GogumaResponse(Goguma goguma, String nickname, boolean isOwner) {
        this.id = goguma.getId();
        this.message = goguma.getMessage();
        this.gogumaType = goguma.getGogumaType();
        this.isOwner = isOwner;
        this.nickname = nickname;
    }

    @ApiModelProperty(notes = "작성자 여부", required = true, example = "false")
    @JsonProperty("isOwner")
    private void setOwner(boolean owner) {
        isOwner = owner;
    }
}
