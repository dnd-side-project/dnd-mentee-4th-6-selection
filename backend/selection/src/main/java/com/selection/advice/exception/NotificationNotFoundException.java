package com.selection.advice.exception;

import com.selection.domain.notification.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NotificationNotFoundException extends RuntimeException {

    private final Logger logger = LoggerFactory.getLogger(NotificationService.class.getName());

    public NotificationNotFoundException(String message) {
        super(message);
        logger.error("{}", message);
    }
}
