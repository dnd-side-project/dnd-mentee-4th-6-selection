package com.selection.domain.notice;

import com.selection.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.AccessLevel;
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
}
