package com.selection.service.notice;

import com.selection.domain.notice.Notice;
import com.selection.dto.notice.NoticeResponseDto;
import com.selection.dto.notice.PageRequestDto;
import com.selection.repository.NoticeReposiotry;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class NoticeService {

    private final NoticeReposiotry noticeReposiotry;

    @Transactional
    public List<NoticeResponseDto> getNotices(PageRequestDto pageRequestDto) {
        Page<Notice> notices = noticeReposiotry.findAll(pageRequestDto.of());
        return notices.stream().map(NoticeResponseDto::new).collect(Collectors.toList());
    }
}
