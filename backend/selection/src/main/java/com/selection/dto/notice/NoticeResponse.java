package com.selection.dto.notice;

import com.selection.domain.notice.Notice;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class NoticeResponse {

  private Long id;
  private String title;
  private String author;
  private String content;
  private LocalDateTime modifiedAt;


  public NoticeResponse(Notice notice) {
    this.id = notice.getId();
    this.title = notice.getTitle();
    this.author = notice.getAuthor();
    this.content = notice.getContent();
    this.modifiedAt = notice.getModifiedAt();
  }
}
