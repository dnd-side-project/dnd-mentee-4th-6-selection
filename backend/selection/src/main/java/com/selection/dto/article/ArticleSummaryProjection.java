package com.selection.dto.article;

import java.sql.Timestamp;

public interface ArticleSummaryProjection {
    Long getId();
    String getTitle();
    String getContent();
    String getAuthor();
    Long getNumOfGogumas();
    Timestamp getCreatedAt();
}
