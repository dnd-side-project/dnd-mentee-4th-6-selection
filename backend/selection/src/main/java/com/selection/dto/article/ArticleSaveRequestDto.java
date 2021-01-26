package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.question.QuestionSaveRequestDto;
import com.selection.dto.tag.TagSaveRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ArticleSaveRequestDto {

    private String title;
    private String content;
    private List<QuestionSaveRequestDto> questions;
    private List<TagSaveRequestDto> tags;

    @Builder
    public ArticleSaveRequestDto(String title, String content, List<QuestionSaveRequestDto> questions, List<TagSaveRequestDto> tags) {
        this.title = title;
        this.content = content;
        this.questions = questions;
        this.tags = tags;
    }

    public Article toEntity() {
        Article article = Article.builder()
                .title(title)
                .content(content)
                .build();

        tags.forEach(tag -> article.addTags(tag.toEntity(article)));
        questions.forEach(question -> article.addQuestions(question.toEntity(article)));
        return article;
    }
}
