package com.selection.dto;

import com.google.common.base.Strings;
import com.selection.domain.user.Role;
import com.selection.domain.user.User;
import com.selection.security.oauth.AuthProvider;
import java.util.Map;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {

    public static final String SOCIAL_TYPE = "social_type";
    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String email;
    private final String nickname;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String email,
        String nickname,
        AuthProvider authProvider) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.email = email;
        this.nickname = Strings.isNullOrEmpty(nickname) ? "익명의 사용자" : nickname;
        attributes.put(SOCIAL_TYPE, authProvider);
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName,
        Map<String, Object> attributes) {

        if (AuthProvider.NAVER.name().equalsIgnoreCase(registrationId)) {
            return ofNaver("id", attributes);
        } else if (AuthProvider.KAKAO.name().equalsIgnoreCase(registrationId)) {
            return ofKakao("id", attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName,
        Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .email((String) attributes.get("email"))
            .nickname((String)attributes.get("name"))
            .attributes(attributes)
            .nameAttributeKey(userNameAttributeName)
            .authProvider(AuthProvider.GOOGLE)
            .build();
    }

    @SuppressWarnings("unchecked")
    public static OAuthAttributes ofNaver(String userNameAttributeName,
        Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return OAuthAttributes.builder()
            .email((String) response.get("email"))
            .nickname((String)response.get("name"))
            .attributes(response)
            .nameAttributeKey(userNameAttributeName)
            .authProvider(AuthProvider.NAVER)
            .build();
    }

    @SuppressWarnings("unchecked")
    public static OAuthAttributes ofKakao(String userNameAttributeName,
        Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>)response.get("profile");

        return OAuthAttributes.builder()
            .email((String) response.get("email"))
            .nickname((String)profile.get("nickname"))
            .attributes(attributes)
            .nameAttributeKey(userNameAttributeName)
            .authProvider(AuthProvider.KAKAO)
            .build();
    }

    public User toEntity() {
        AuthProvider authProvider = (AuthProvider) attributes.get(SOCIAL_TYPE);
        return User.builder()
            .userId(email)
            .nickname(nickname)
            .provider(authProvider)
            .role(Role.USER)
            .build();
    }
}
