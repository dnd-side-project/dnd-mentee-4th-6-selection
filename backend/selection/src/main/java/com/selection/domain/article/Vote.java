package com.selection.domain.article;

import com.selection.domain.BaseEntity;
import javax.persistence.Column;
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
@Table(name = "VOTES")
public class Vote extends BaseEntity {

    @Column(nullable = false)
    String author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Choice choice;

    public Vote(String author, Choice choice) {
        this.author = author;
        this.choice = choice;
    }
}
