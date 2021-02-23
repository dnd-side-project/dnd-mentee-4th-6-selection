package com.selection.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Getter
public class ErrorResponse {


    private final int statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    private List<String> errorMessages;
    private final LocalDateTime when = LocalDateTime.now();

    public ErrorResponse(List<String> errorMessages) {
        this.errorMessages = errorMessages;
    }
}

