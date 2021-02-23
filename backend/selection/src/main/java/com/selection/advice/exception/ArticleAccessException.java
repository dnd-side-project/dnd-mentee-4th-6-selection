package com.selection.advice.exception;


import com.selection.domain.article.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArticleAccessException extends RuntimeException {

    private final Logger logger = LoggerFactory.getLogger(ArticleService.class.getName());

    public ArticleAccessException(String message) {
        super(message);
        logger.error("{}", message);
    }
}
