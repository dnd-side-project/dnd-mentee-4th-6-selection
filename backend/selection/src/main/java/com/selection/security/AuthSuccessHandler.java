package com.selection.security;

import java.io.IOException;
import java.util.Collections;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenGenerator jwtTokenGenerator;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {
        DefaultOAuth2User user = ((DefaultOAuth2User) (authentication.getPrincipal()));
        String accessToken = jwtTokenGenerator.createToken(user.getName(),
            Collections.singletonList(UserRole.USER.name()));

        Cookie cookie = new Cookie("X-Auth-Token", accessToken);
        response.addCookie(cookie);

        response.sendRedirect("/login_success");
    }
}
