package com.selection.dto.notification;

import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NotificationResponse {

    @ApiModelProperty(notes = "게시글 제목", required = true, example = "제목")
    @NotEmpty
    private String title;

    @ApiModelProperty(notes = "보낸 사람의 닉네임", required = true, example = "애플")
    @NotEmpty
    private String nickname;

    @ApiModelProperty(notes = "보낸 날짜", required = true)
    @NotNull
    private LocalDateTime sendedTime;

    public NotificationResponse(@NotEmpty String title,
        @NotEmpty String nickname, @NotNull LocalDateTime sendedTime) {
        this.title = title;
        this.nickname = nickname;
        this.sendedTime = sendedTime;
    }
}
