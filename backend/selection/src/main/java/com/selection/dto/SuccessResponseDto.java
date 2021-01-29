package com.selection.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SuccessResponseDto extends BaseResponseDto {
    private String message;
    private Object data;

    @Builder
    public SuccessResponseDto(String message, Object data) {
        super(HttpStatus.OK);
        this.message = message;
        this.data = data;
    }
}
