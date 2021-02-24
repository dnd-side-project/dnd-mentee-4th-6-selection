package com.selection.dto.notification;

import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NotificationResponse {

    @ApiModelProperty(notes = "번호", required = true, example = "1")
    private Long id;

    @ApiModelProperty(notes = "고구마 번호", required = true, example = "1")
    private Long gogumaId;

    @ApiModelProperty(notes = "게시글 제목", required = true, example = "제목")
    private String title;

    @ApiModelProperty(notes = "보낸 사람의 닉네임", required = true, example = "애플")
    private String nickname;

    @ApiModelProperty(notes = "보낸 날짜", required = true)
    private LocalDateTime sendedTime;

    public NotificationResponse(Long id, Long gogumaId, String title, String nickname,
        LocalDateTime sendedTime) {
        this.id = id;
        this.gogumaId = gogumaId;
        this.title = title;
        this.nickname = nickname;
        this.sendedTime = sendedTime;
    }
}
