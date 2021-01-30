package com.selection.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationProcessingException extends AuthenticationException {

    public OAuth2AuthenticationProcessingException(String massage, Throwable t) {
        super(massage, t);
    }

    public OAuth2AuthenticationProcessingException(String message) {
        super(message);
    }
}