package com.selection.dto.article;

import com.selection.dto.question.QuestionModifyRequest;
import com.selection.dto.tag.TagModifyRequest;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleModifyRequest {

    private String title;
    private String content;
    private String backgroundColor;

    private List<QuestionModifyRequest> questions;
    private List<TagModifyRequest> tags;

    @Builder
    public ArticleModifyRequest(String title, String content, String backgroundColor,
        List<QuestionModifyRequest> questions,
        List<TagModifyRequest> tags) {
        this.title = title;
        this.content = content;
        this.backgroundColor = backgroundColor;
        this.questions = questions;
        this.tags = tags;
    }
}
