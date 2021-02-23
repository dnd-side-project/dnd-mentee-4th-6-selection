package com.selection.dto.user;

import com.selection.security.oauth.AuthProvider;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ProfileResponse {
    
    @ApiModelProperty(notes = "이메일", required = true, example = "xxx@xxx.com")
    private String userId;
    @ApiModelProperty(notes = "닉네임", required = true, example = "애플")
    private String nickname;
    @ApiModelProperty(notes = "소셜 로그인 종류", required = true, example = "KAKAO")
    private AuthProvider socialType;

    public ProfileResponse(String userId, String nickname, AuthProvider socialType) {
        this.userId = userId;
        this.nickname = nickname;
        this.socialType = socialType;
    }
}
