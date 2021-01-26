package com.selection.service;

import com.selection.domain.user.User;
import com.selection.repository.UserRepository;
import com.selection.security.OAuthAttributes;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>, UserDetailsService{

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("email [" +  email +"] 이 존재하지 않습니다."));
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = findClientRegistrationIdFrom(userRequest);
        String userNameAttributeName = findUserNameAttributeNameFrom(userRequest);

        OAuthAttributes oAuthAttributes =
            OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User user = saveOrFindUser(oAuthAttributes);

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(
            user.getRoleName())), oAuthAttributes.getAttributes(), oAuthAttributes.getNameAttributeKey());
    }

    private String findClientRegistrationIdFrom(OAuth2UserRequest userRequest) {
        return userRequest.getClientRegistration()
            .getRegistrationId(); // 카카오, 네이버, 구글
    }

    private String findUserNameAttributeNameFrom(OAuth2UserRequest userRequest) {
        return userRequest.getClientRegistration()
            .getProviderDetails()
            .getUserInfoEndpoint()
            .getUserNameAttributeName();
    }

    private User saveOrFindUser(OAuthAttributes oAuthAttributes) {
        User user = userRepository.findByEmail(oAuthAttributes.getEmail())
            .orElse(oAuthAttributes.toEntity());

        return userRepository.save(user);
    }
}
