package com.selection.dto;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Getter
public class ErrorResponse {

    private final int status = HttpStatus.INTERNAL_SERVER_ERROR.value();
    private final HttpStatus error = HttpStatus.INTERNAL_SERVER_ERROR;
    private final Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());
    private String message;

    public ErrorResponse(String message) {
        this.message = message;
    }
}

