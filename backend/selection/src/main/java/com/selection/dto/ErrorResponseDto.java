package com.selection.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
public class ErrorResponseDto extends BaseResponseDto {

    private final int errorCode;
    private final String errorMessage;
    private final String errorMessageDetail;

    @Builder
    public ErrorResponseDto(int errorCode, String errorMessage, String errorMessageDetail) {
        super(HttpStatus.NOT_FOUND);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorMessageDetail = errorMessageDetail;
    }
}
