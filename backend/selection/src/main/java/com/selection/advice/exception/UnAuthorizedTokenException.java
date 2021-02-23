package com.selection.advice.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UnAuthorizedTokenException extends RuntimeException {

    private final Logger logger = LoggerFactory.getLogger(UnAuthorizedTokenException.class.getName());
    public UnAuthorizedTokenException(String message) {
        super(message);
    }
}
