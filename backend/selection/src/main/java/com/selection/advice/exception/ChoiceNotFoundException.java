package com.selection.advice.exception;

import com.selection.domain.article.Choices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ChoiceNotFoundException extends RuntimeException {
    private final Logger logger = LoggerFactory.getLogger(Choices.class.getName());
    public ChoiceNotFoundException(String message) {
        super(message);
        logger.error("{}", message);
    }
}
