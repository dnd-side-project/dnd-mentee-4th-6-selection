package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import com.selection.domain.question.Question;
import com.selection.domain.tag.Tag;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="ARTICLES")
public class Article extends BaseEntity {

    @Id
    @Column(name="ARTICLE_ID")
    private Long id;

    @Column(nullable = false, length=30)
    private String title;

    @Lob
    private String content;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String backgroundColor = "#FFFFFFF";

    @Column(nullable = false)
    private Long numOfShares = 0L;

    @OneToMany(mappedBy = "article", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Question> questions = new HashSet<>();

    @OneToMany(mappedBy = "article", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();

    @Builder
    public Article(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void addQuestions(Question question) {
        this.questions.add(question);
    }

    public void addTags(Tag tag) {
        this.tags.add(tag);
    }

    public void share() {
        this.numOfShares++;
    }

    public void changeBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

}
