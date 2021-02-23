package com.selection.advice.exception;

import com.selection.domain.article.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArticleNotFoundException extends RuntimeException {

    private final Logger logger = LoggerFactory.getLogger(ArticleService.class.getName());

    public ArticleNotFoundException(String message) {
        super(message);
        logger.error("{}", message);
    }
}
