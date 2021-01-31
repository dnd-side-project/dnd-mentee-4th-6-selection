package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import com.selection.domain.question.Question;
import com.selection.domain.tag.Tag;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private String backgroundColor = "#FFFFFF";

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
