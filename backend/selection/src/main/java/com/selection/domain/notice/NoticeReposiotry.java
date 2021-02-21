package com.selection.domain.notice;

import com.selection.domain.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeReposiotry extends JpaRepository<Notice, Long> {
}
