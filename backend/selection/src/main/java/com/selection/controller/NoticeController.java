package com.selection.controller;

import com.selection.dto.PageRequest;
import com.selection.dto.notice.NoticeResponse;
import com.selection.service.notice.NoticeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/notices")
    public ResponseEntity<List<NoticeResponse>> getNotices(PageRequest pageRequest) {
        List<NoticeResponse> notices = noticeService.getNotices(pageRequest);
        return ResponseEntity.ok(notices);
    }
}
