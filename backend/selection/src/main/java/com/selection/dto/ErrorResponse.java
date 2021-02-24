package com.selection.dto;

import io.swagger.annotations.ApiModelProperty;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Getter
public class ErrorResponse {

    @ApiModelProperty(notes = "상태 코드", required = true, example = "500")
    private final int status = HttpStatus.INTERNAL_SERVER_ERROR.value();
    @ApiModelProperty(notes = "상태명", required = true, example = "INTERNAL_SERVER_ERROR")
    private final HttpStatus error = HttpStatus.INTERNAL_SERVER_ERROR;
    @ApiModelProperty(notes = "에러 발생 시간", required = true)
    private final Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());
    @ApiModelProperty(notes = "에러 메시지", required = true, example = "해당 게시글이 존재하지 않습니다.")
    private String message;

    public ErrorResponse(String message) {
        this.message = message;
    }
}

