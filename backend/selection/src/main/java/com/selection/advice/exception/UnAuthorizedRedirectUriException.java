package com.selection.advice.exception;

import com.selection.security.oauth.OAuth2AuthenticationSuccessHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UnAuthorizedRedirectUriException extends RuntimeException {

    private final Logger logger = LoggerFactory
        .getLogger(OAuth2AuthenticationSuccessHandler.class.getName());

    public UnAuthorizedRedirectUriException(String message) {
        super(message);
        logger.error("{}", message);
    }
}