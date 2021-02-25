package com.selection.dto.goguma;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.selection.domain.article.GogumaType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GogumaSummaryResponse {

    @ApiModelProperty(notes = "고구마 번호", required = true, example = "1")
    private Long id;
    @ApiModelProperty(notes = "고구마 타입", required = true, example = "GOOD")
    private GogumaType gogumaType;
    private boolean isOwner;
    private boolean isRead;
    private boolean isExistMessage;

    public GogumaSummaryResponse(Long id, GogumaType gogumaType, boolean isOwner, boolean isRead,
        boolean isExistMessage) {
        this.id = id;
        this.gogumaType = gogumaType;
        this.isOwner = isOwner;
        this.isRead = isRead;
        this.isExistMessage = isExistMessage;
    }

    @ApiModelProperty(notes = "작성자 여부", required = true, example = "false")
    @JsonProperty("isOwner")
    private void setOwner(boolean owner) {
        isOwner = owner;
    }

    @ApiModelProperty(notes = "작성자 읽음 여부", required = true, example = "false")
    @JsonProperty("isRead")
    private void setRead(boolean read) {
        isRead = read;
    }

    @ApiModelProperty(notes = "내용 존재 여부", required = true, example = "false")
    @JsonProperty("isExistMessage")
    private void setExistMessage(boolean existMessage) {
        isExistMessage = existMessage;
    }
}
