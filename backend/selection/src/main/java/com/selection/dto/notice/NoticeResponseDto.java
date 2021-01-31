package com.selection.dto.notice;

import com.selection.domain.notice.Notice;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponseDto {
    private Long id;
    private String title;
    private String author;
    private String content;
    private LocalDateTime modifiedAt;


    public NoticeResponseDto(Notice notice) {
        this.id = notice.getId();
        this.title = notice.getTitle();
        this.author = notice.getAuthor();
        this.content = notice.getContent();
        this.modifiedAt = notice.getModifiedAt();
    }
}
