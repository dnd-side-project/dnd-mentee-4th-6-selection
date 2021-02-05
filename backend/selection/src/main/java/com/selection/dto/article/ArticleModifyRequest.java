package com.selection.dto.article;

import com.selection.dto.question.QuestionModifyRequest;
import com.selection.dto.tag.TagModifyRequest;
import java.util.List;
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
}
