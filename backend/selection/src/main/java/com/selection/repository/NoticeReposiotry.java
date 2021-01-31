package com.selection.repository;

import com.selection.domain.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface NoticeReposiotry extends JpaRepository<Notice, Long> {
}
