package com.selection.dto.goguma;

import com.selection.domain.article.GogumaType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GogumaSummaryResponse {

    @ApiModelProperty(notes = "번호", required = true, example = "1")
    private Long id;
    @ApiModelProperty(notes = "고구마 타입", required = true, example = "GOOD")
    private GogumaType gogumaType;
    @ApiModelProperty(notes = "작성자 여부", required = true, example = "false")
    private boolean isOwner;
    @ApiModelProperty(notes = "작성자 읽음 여부", required = true, example = "false")
    private boolean isRead;
    @ApiModelProperty(notes = "내용 존재 여부", required = true, example = "false")
    private boolean isBody;


    public GogumaSummaryResponse(Long id, GogumaType gogumaType, boolean isOwner, boolean isRead,
        boolean isBody) {
        this.id = id;
        this.gogumaType = gogumaType;
        this.isOwner = isOwner;
        this.isRead = isRead;
        this.isBody = isBody;
    }
}
