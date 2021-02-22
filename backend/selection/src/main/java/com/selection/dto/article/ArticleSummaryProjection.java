package com.selection.dto.article;

import java.math.BigInteger;
import java.sql.Timestamp;

public interface ArticleSummaryProjection {
    BigInteger getId();
    String getTitle();
    String getContent();
    Timestamp getCreatedAt();
    String getUserId();
    BigInteger getNumOfGogumas();
}
