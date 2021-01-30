package com.selection.security.oauth;

import com.selection.domain.AuthProvider;
import com.selection.domain.user.User;
import com.selection.exception.OAuth2AuthenticationProcessingException;
import com.selection.repository.UserRepository;
import com.selection.security.UserPrincipal;
import com.selection.security.oauth.user.OAuth2UserInfo;
import com.selection.security.oauth.user.OAuth2UserInfoFactory;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
            oAuth2UserRequest.getClientRegistration()
                .getRegistrationId(),
            oAuth2User.getAttributes()
        );
        String email = oAuth2UserInfo.getEmail();

        if(Objects.isNull(email) || "".equals(email)) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;

        if(userOptional.isPresent()) {
            user = userOptional.get();

            if(!user.getProvider().equals(AuthProvider.valueOf(
                    oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with "
                    + user.getProvider() + " account. Please use your "
                    + user.getProvider() + " account to login.");
            }
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = User.builder()
            .provider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))
            .providerId(oAuth2UserInfo.getId())
            .email(oAuth2UserInfo.getEmail())
            .build();

        return userRepository.save(user);
    }
}
