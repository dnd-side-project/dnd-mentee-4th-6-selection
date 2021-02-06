package com.selection.domain.question;

import com.selection.domain.BaseEntity;
import com.selection.domain.article.Article;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "QUESTIONS")
public class Question extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Article article;

    @Builder
    public Question(String description, Article article) {
        this.description = description;
        this.article = article;
    }

    void modifyDescription(String description) {
        this.description = description;
    }
}
