package com.selection.domain.notice;

import com.selection.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="NOTICES")
public class Notice extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="NOTICE_ID")
    private Long id;

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
