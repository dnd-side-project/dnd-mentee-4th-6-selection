package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import com.selection.domain.question.Questions;
import com.selection.domain.tag.Tags;
import com.selection.dto.question.QuestionRequest;
import com.selection.dto.tag.TagRequest;
import io.jsonwebtoken.lang.Assert;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embedded;
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
    private String backgroundColor;

    @Column(nullable = false)
    private Long numOfShares = 0L;

    @Embedded
    @Column(nullable = false)
    private final Questions questions = new Questions();

    @Embedded
    @Column(nullable = false)
    private final Tags tags = new Tags();

    @Builder
    public Article(String title, String content, String backgroundColor, String author) {
        Assert.hasText(title, "title must not be empty");
        Assert.hasText(content, "content must not be empty");
        Assert.hasText(author, "author must not be empty");

        if (Objects.isNull(backgroundColor)) {
            backgroundColor = "#FFFFFF";
        }
        this.title = title;
        this.content = content;
        this.backgroundColor = backgroundColor;
        this.author = author;
    }

    public void share() {
        this.numOfShares++;
    }

    public void modifyTitle(String title) {
        this.title = title;
    }

    public void modifyContent(String content) {
        this.content = content;
    }

    public void modifyBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public void modifyQuestions(List<QuestionRequest> requestQuestions) {
        questions.modify(this, requestQuestions);
    }

    public void modifyTags(List<TagRequest> requestTags) {
        tags.modify(this, requestTags);
    }
}
