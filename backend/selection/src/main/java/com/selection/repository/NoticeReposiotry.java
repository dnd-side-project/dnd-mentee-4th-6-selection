package com.selection.repository;

import com.selection.domain.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeReposiotry extends JpaRepository<Notice, Long> {
}
