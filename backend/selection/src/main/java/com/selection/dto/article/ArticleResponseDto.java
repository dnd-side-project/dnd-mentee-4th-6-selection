package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.SuccessResponseDto;
import com.selection.dto.question.QuestionResponseDto;
import com.selection.dto.tag.TagResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ArticleResponseDto {

    private Long id;
    private String title;
    private String content;
    private Long numOfShares;
    private List<TagResponseDto> tags = new ArrayList<>();
    private List<QuestionResponseDto> questions = new ArrayList<>();

    public ArticleResponseDto(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.numOfShares = article.getNumOfShares();

        article.getTags().forEach(tag -> tags.add(new TagResponseDto(tag)));
        article.getQuestions().forEach(question -> questions.add(new QuestionResponseDto(question)));
    }
}
