package com.selection.domain.article;

import com.selection.advice.exception.ChoiceNotFoundException;
import com.selection.domain.BaseEntity;
import com.selection.dto.choice.ChoiceRequest;
import com.selection.dto.choice.ChoiceResponse;
import com.selection.dto.goguma.GogumaRequest;
import java.util.List;
import java.util.Optional;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
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

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private Long numOfShared = 0L;

    @Embedded
    @Column(nullable = false)
    private final Choices choices = new Choices();

    @Embedded
    @Column(nullable = false)
    private final Gogumas gogumas = new Gogumas();

    public Article(String title, String content, String userId) {
        this.title = title;
        this.content = content;
        this.userId = userId;
    }

    public void modifyTitle(String title) {
        this.title = title;
    }

    public void modifyContent(String content) {
        this.content = content;
    }

    public void addChoices(List<Choice> choices) {
        this.choices.addAll(choices);
    }

    public void addGoguma(Goguma goguma) {
        gogumas.add(goguma);
    }

    public Goguma lookUpGoguma(Long gogumaId) {
        return gogumas.findById(gogumaId);
    }

    public void deleteGoguma(Long gogumaId, String userId) {
        gogumas.delete(gogumaId, userId);
    }

    public void modifyChoices(List<ChoiceRequest> choiceRequests) {
        choices.modify(this, choiceRequests);
    }

    public void modifyGoguma(Long gogumaId, String userId, GogumaRequest gogumaRequest) {
        gogumas.modify(gogumaId, userId,gogumaRequest);
    }

    public void voteOnChoice(Long choiceId, String userId) {
        if (!choices.contains(choiceId)) {
            throw new ChoiceNotFoundException(
                String.format("해당 선택지(%s)는 존재하지 않습니다.", choiceId)
            );
        }

        Optional<Choice> choice = choices.findVotedByUserId(userId);
        choice.ifPresent(ch -> {
            if (!ch.getId().equals(choiceId)) {
                ch.cancelVote(userId);
            }
        });

        choices.vote(choiceId, userId);
    }

    public List<ChoiceResponse> toChoicesResponse() {
        return choices.toResponse();
    }
}
