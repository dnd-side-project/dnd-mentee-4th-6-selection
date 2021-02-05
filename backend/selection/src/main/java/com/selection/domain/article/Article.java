package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import com.selection.domain.question.Questions;
import com.selection.domain.tag.Tags;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
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
    private String backgroundColor = "#FFFFFF";

    @Column(nullable = false)
    private Long numOfShares = 0L;

    @Column(nullable = false)
    private Questions questions = new Questions();

    @Column(nullable = false)
    private Tags tags = new Tags();

    @Builder
    public Article(String title, String content, String backgroundColor, String author) {
        this.title = title;
        this.content = content;
        this.backgroundColor = backgroundColor;
        this.author = author;
    }

    public void share() {
        this.numOfShares++;
    }

    public void changeBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public void changeTitle(String title) {
        this.title = title;
    }

    public void changeContent(String content) {
        this.content = content;
    }

}
