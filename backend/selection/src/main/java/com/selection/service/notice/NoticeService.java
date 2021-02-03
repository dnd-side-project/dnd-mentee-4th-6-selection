package com.selection.service.notice;

import com.selection.domain.notice.Notice;
import com.selection.dto.notice.NoticeResponse;
import com.selection.dto.notice.PageRequest;
import com.selection.repository.NoticeReposiotry;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NoticeService {

    private final NoticeReposiotry noticeReposiotry;

    @Transactional
    public List<NoticeResponse> getNotices(PageRequest pageRequest) {
        Page<Notice> notices = noticeReposiotry.findAll(pageRequest.of());
        return notices.stream().map(NoticeResponse::new).collect(Collectors.toList());
    }
}
