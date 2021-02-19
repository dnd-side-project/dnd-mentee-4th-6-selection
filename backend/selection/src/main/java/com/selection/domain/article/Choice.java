package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "CHOICES")
public class Choice extends BaseEntity {

    @Column(nullable = false, length = 30)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Article article;

    @Embedded
    private final Votes votes = new Votes();

    public Choice(Long id, String content, Article article) {
        super(id);
        this.content = content;
        this.article = article;
    }

    public Choice(String content, Article article) {
        this.content = content;
        this.article = article;
    }

    protected void modifyContent(String content) {
        this.content = content;
    }

    protected boolean existVoteByAuthor(String author) {
        return votes.existByAuthor(author);
    }

    protected void vote(Vote vote) {
        if (!existVoteByAuthor(vote.getAuthor()))
            votes.add(vote);
    }

    protected void cancelVote(String author) {
        votes.delete(author);
    }
}
