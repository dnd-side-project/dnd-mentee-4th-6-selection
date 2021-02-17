package com.selection.domain.tag;

import com.selection.domain.BaseEntity;
import com.selection.domain.article.Article;
import io.jsonwebtoken.lang.Assert;
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
@Table(name = "TAGS")
public class Tag extends BaseEntity {

    @Column(nullable = false, length = 10)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Article article;

    @Builder
    public Tag(String content, Article article) {
        Assert.hasText(content, "content must not be empty.");
        Assert.notNull(article, "article must not be null");
        this.content = content;
        this.article = article;
    }

    public void modifyContent(String content) {
        this.content = content;
    }
}
