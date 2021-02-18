package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.question.ChoiceRequest;
import com.selection.dto.question.ChoiceResponse;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "ARTICLES")
public class Article extends BaseEntity {

    @Column(nullable = false, length = 30)
    private String title;

    @Lob
    private String content;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private Long numOfShared = 0L;

    @Embedded
    @Column(nullable = false)
    private final Choices choices = new Choices();

    @Embedded
    @Column(nullable = false)
    private final Gogumas gogumas = new Gogumas();

    public Article(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void modifyTitle(String title) {
        this.title = title;
    }

    public void modifyContent(String content) {
        this.content = content;
    }

    public void share() {
        this.numOfShared++;
    }

    public void addChoice(Choice question) {
        choices.add(question);
    }

    public void addChoices(List<Choice> questions) {
        this.choices.addAll(questions);
    }

    public void addGoguma(Goguma goguma) {
        gogumas.add(goguma);
    }

    public Goguma lookUpGoguma(Long gogumaId) {
        return gogumas.findById(gogumaId);
    }

    public void deleteGoguma(Long gogumaId) {
        gogumas.delete(gogumaId);
    }

    public void modifyChoices(List<ChoiceRequest> choiceRequests) {
        choices.modify(this, choiceRequests);
    }

    public void modifyGoguma(Long gogumaId, GogumaRequest gogumaRequest) {
        gogumas.modify(gogumaId, gogumaRequest);
    }

    public List<ChoiceResponse> toChoicesResponse() {
        return choices.toResponse();
    }

}
