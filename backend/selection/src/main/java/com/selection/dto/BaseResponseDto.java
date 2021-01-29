package com.selection.dto;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
public class BaseResponseDto {
    protected final int status;
    protected final LocalDateTime timestamp = LocalDateTime.now();

    public BaseResponseDto(HttpStatus status) {
        this.status = status.value();
    }
}
