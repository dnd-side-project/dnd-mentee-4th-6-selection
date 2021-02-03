package com.selection.domain.notice;

import com.selection.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "NOTICES")
public class Notice extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String author;

    @Lob
    private String content;

    @Builder
    public Notice(String title, String author, String content) {
        this.title = title;
        this.author = author;
        this.content = content;
    }
}
