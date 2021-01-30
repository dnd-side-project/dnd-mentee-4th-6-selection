package com.selection.security.oauth.user;

import com.selection.domain.AuthProvider;
import com.selection.exception.OAuth2AuthenticationProcessingException;
import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider.google.name())) {
            return new GoogleOAuth2UserInfo(attributes);
        }
//        else if (registrationId.equalsIgnoreCase(AuthProvider.NAVER.name())) {
//            return new FacebookOAuth2UserInfo(attributes);
//        }
//        else if (registrationId.equalsIgnoreCase(AuthProvider.KAKAO.name())) {
//            return new GithubOAuth2UserInfo(attributes);
//        }
        else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}