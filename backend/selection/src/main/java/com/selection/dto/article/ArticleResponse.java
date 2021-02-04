package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.dto.question.QuestionResponse;
import com.selection.dto.tag.TagResponse;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class ArticleResponse {

    private Long id;
    private String title;
    private String content;
    private String author;
    private String backgroundColor;
    private Long numOfShares;

    private List<TagResponse> tags = new ArrayList<>();
    private List<QuestionResponse> questions = new ArrayList<>();

    public ArticleResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.numOfShares = article.getNumOfShares();
        this.author = article.getAuthor();
        this.backgroundColor = article.getBackgroundColor();

        this.questions.addAll(article.getQuestions().toResponses());
        this.tags.addAll(article.getTags().toResponses());
    }
}