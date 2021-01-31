package com.selection.domain.question;

import com.selection.domain.BaseEntity;
import com.selection.domain.article.Article;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="QUESTIONS")
public class Question extends BaseEntity {
    @Id
    @Column(name="QUESTION_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String description;

    @ManyToOne
    @JoinColumn(name="ARTICLE_ID")
    private Article article;

    @Builder
    public Question(String description, Article article) {
        this.description = description;
        this.article = article;
    }
}
