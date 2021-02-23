package com.selection.advice.exception;

import com.selection.domain.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserNotFoundException extends RuntimeException {

    private final Logger logger = LoggerFactory.getLogger(UserService.class.getName());
    public UserNotFoundException(String message) {
        super(message);
        logger.error("{}", message);
    }
}
