package com.selection.dto.user;

import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfileRequest {

    @ApiModelProperty(notes = "닉네임", required = true, example = "애플")
    @NotEmpty(message = "닉네임은 공백일 수 없습니다.")
    @Size(max=8, message = "닉네임은 최대 8자이하여야 합니다.")
    private String nickname;
}
