package com.selection.controller.article;

import com.selection.domain.notice.Notice;
import com.selection.dto.BaseResponseDto;
import com.selection.dto.SuccessResponseDto;
import com.selection.dto.notice.NoticeResponseDto;
import com.selection.dto.notice.PageRequestDto;
import com.selection.service.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NoticeApiController {

    private final NoticeService noticeService;

    @GetMapping("/notices")
    public ResponseEntity<BaseResponseDto> getNotices(PageRequestDto pageRequestDto) {
        List<NoticeResponseDto> notices = noticeService.getNotices(pageRequestDto);
        String message = notices.size() == 0 ? "등록된 공지사항이 존재하지 않습니다." : "공지사항을 성공적으로 조회하였습니다.";
        SuccessResponseDto success = SuccessResponseDto.builder()
                .message(message)
                .data(notices)
                .build();

        return new ResponseEntity<>(success, HttpStatus.valueOf(success.getStatus()));
    }
}
