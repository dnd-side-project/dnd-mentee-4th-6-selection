package com.selection.domain.notification;

import com.selection.domain.BaseEntity;
import com.selection.domain.article.Article;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "NOTIFICATIONS")
public class Notification extends BaseEntity {

    @Column(nullable = false)
    private Boolean isRead = false;

    @Column(nullable = false)
    private String senderUserId;

    @Column(nullable = false)
    private String receiverUserId;

    @ManyToOne
    @JoinColumn
    private Article article;

    public Notification(String userIdOfReceiver, String userIdOfSender, Article article) {
        this.senderUserId = userIdOfReceiver;
        this.receiverUserId = userIdOfSender;
        this.article = article;
    }

    public void read() {
        this.isRead = true;
    }
}
