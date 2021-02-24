package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "GOGUMAS")
public class Goguma extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private GogumaType gogumaType;

    private String message = Strings.EMPTY;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private boolean isRead = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Article article;

    public Goguma(GogumaType type, String userId, Article article) {
        this(Strings.EMPTY, type, userId, article);
    }

    public Goguma(String message, GogumaType gogumaType, String userId, Article article) {
        this.message = message;
        this.gogumaType = gogumaType;
        this.userId = userId;
        this.article = article;
    }

    protected void modifyMessage(String message) {
        this.message = message;
    }

    protected void modifyGogumaType(GogumaType gogumaType) {
        this.gogumaType = gogumaType;
    }

    protected void read() {
        this.isRead = true;
    }
}
