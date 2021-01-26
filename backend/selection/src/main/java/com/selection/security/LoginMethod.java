package com.selection.security;

import lombok.Getter;

@Getter
public enum LoginMethod {

    GOOGLE("google"),
    NAVER("naver"),
    KAKAO("kakao");

    private final String registrationId;

    LoginMethod(String registrationId) {
        this.registrationId = registrationId;
    }

    public boolean isRegistrationId(String registrationId) {
        return this.registrationId.equals(registrationId);
    }
}
