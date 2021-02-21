package com.selection.dto.article;


import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArticleSummaryResponse {

    @ApiModelProperty(notes = "번호", required = true, example = "1")
    private final Long id;
    @ApiModelProperty(notes = "제목", required = true, example = "제목")
    private final String title;
    @ApiModelProperty(notes = "본문", required = true, example = "본문")
    private final String content;
    @ApiModelProperty(notes = "작성자", required = true, example = "xxx@google.com")
    private final String author;
    @ApiModelProperty(notes = "고구마수", required = true, example = "100")
    private final Long numOfGogumas;
    @ApiModelProperty(notes = "작성일자", required = true)
    private final LocalDateTime createdAt;


    public ArticleSummaryResponse(Long id, String title, String content,
        LocalDateTime createdAt, String author, Long numOfGogumas) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.numOfGogumas = numOfGogumas;
        this.createdAt = createdAt;
    }

    public ArticleSummaryResponse(ArticleSummaryProjection articleSummaryProjection) {
        this.id = articleSummaryProjection.getId();
        this.title = articleSummaryProjection.getTitle();
        this.content = articleSummaryProjection.getContent();
        this.author = articleSummaryProjection.getAuthor();
        this.numOfGogumas = articleSummaryProjection.getNumOfGogumas();
        this.createdAt = articleSummaryProjection.getCreatedAt().toLocalDateTime();
    }
}
