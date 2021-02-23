package com.selection.advice;

import com.selection.advice.exception.ArticleAccessException;
import com.selection.advice.exception.ArticleNotFoundException;
import com.selection.advice.exception.ChoiceNotFoundException;
import com.selection.advice.exception.NotificationNotFoundException;
import com.selection.advice.exception.UnAuthorizedRedirectUriException;
import com.selection.advice.exception.UnAuthorizedTokenException;
import com.selection.advice.exception.UserNotFoundException;
import com.selection.dto.ErrorResponse;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse methodArgumentNotValidException(
        MethodArgumentNotValidException ex) {
        final Logger logger = LoggerFactory
            .getLogger(MethodArgumentNotValidException.class.getName());

        List<String> errorMessages = ex.getBindingResult().getAllErrors().stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
        logger.error("{}", String.join("\n", errorMessages));
        return new ErrorResponse(errorMessages);
    }

    @ExceptionHandler(UnAuthorizedTokenException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse unAuthorizedTokenException(UnAuthorizedTokenException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(UnAuthorizedRedirectUriException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse unAuthorizedTokenException(UnAuthorizedRedirectUriException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse userNotFoundException(UserNotFoundException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(ArticleNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse articleNotFoundException(ArticleNotFoundException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(ArticleAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse articleAccessException(ArticleAccessException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(NotificationNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse notificationNotFoundException(NotificationNotFoundException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(ChoiceNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse choiceNotFoundException(ChoiceNotFoundException ex) {
        return new ErrorResponse(Collections.singletonList(ex.getMessage()));
    }
}
