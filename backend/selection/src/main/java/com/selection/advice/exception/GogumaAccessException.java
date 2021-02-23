package com.selection.advice.exception;

import com.selection.domain.article.GogumaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GogumaAccessException extends RuntimeException {

    private final Logger logger = LoggerFactory.getLogger(GogumaService.class.getName());
    public GogumaAccessException(String message) {
        super(message);
        logger.error("{}", message);
    }
}
