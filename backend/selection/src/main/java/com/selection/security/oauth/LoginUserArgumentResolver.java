package com.selection.security.oauth;

import com.selection.domain.user.LoginUser;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.core.MethodParameter;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        Authentication authentication = SecurityContextHolder
            .getContext().getAuthentication();
        return parameter.getParameterAnnotation(LoginUser.class) != null
            && authentication instanceof UsernamePasswordAuthenticationToken;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
        @Nullable ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) {
        Authentication authentication = SecurityContextHolder
            .getContext().getAuthentication();

        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            UsernamePasswordAuthenticationToken authenticationToken
                = (UsernamePasswordAuthenticationToken) authentication;
            UserPrincipal userPrincipal = (UserPrincipal) authenticationToken.getPrincipal();
            return userPrincipal.getEmail();
        } else {
            return Strings.EMPTY;
        }
    }
}
