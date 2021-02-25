package com.selection.advice;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.selection.advice.exception.ArticleAccessException;
import com.selection.advice.exception.ArticleNotFoundException;
import com.selection.advice.exception.ChoiceNotFoundException;
import com.selection.advice.exception.GogumaAccessException;
import com.selection.advice.exception.GogumaNotFoundException;
import com.selection.advice.exception.NotificationNotFoundException;
import com.selection.advice.exception.UserNotFoundException;
import com.selection.dto.ErrorResponse;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse methodArgumentNotValidException(
        MethodArgumentNotValidException ex) {
        final Logger logger = LoggerFactory
            .getLogger(MethodArgumentNotValidException.class.getName());

        String errorMessages = ex.getBindingResult().getAllErrors().stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.joining("\n"));
        logger.error("{}", String.join("\n", errorMessages));
        return new ErrorResponse(errorMessages);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse userNotFoundException(UserNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(ArticleNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse articleNotFoundException(ArticleNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(ArticleAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse articleAccessException(ArticleAccessException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(NotificationNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse notificationNotFoundException(NotificationNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(ChoiceNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse choiceNotFoundException(ChoiceNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(GogumaNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse gogumaNotFoundException (GogumaNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(GogumaAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse gogumaAccessException(GogumaAccessException ex) {
        return new ErrorResponse(ex.getMessage());
    }

    @ExceptionHandler(InvalidFormatException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse httpMessageNotReadableException(InvalidFormatException ex) {
        return new ErrorResponse(ex.getOriginalMessage());
    }
}
