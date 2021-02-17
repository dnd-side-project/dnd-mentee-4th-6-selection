package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "GOGUMAS")
public class Goguma extends BaseEntity {

    private String message = Strings.EMPTY;

    @Enumerated(EnumType.STRING)
    private GogumaType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Article article;

    public Goguma(GogumaType type, Article article) {
        this(Strings.EMPTY, type, article);
    }

    public Goguma(String message, GogumaType type, Article article) {
        this.type = type;
        this.message = message;
    }

    public void modifyMessage(String message) {
        this.message = message;
    }

    public void modifyType(GogumaType type) {
        this.type = type;
    }

}
