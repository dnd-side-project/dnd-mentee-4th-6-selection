package com.selection.domain.notification;

import com.selection.domain.article.Article;
import com.selection.domain.user.User;
import com.selection.domain.user.UserService;
import com.selection.dto.PageRequest;
import com.selection.dto.notification.NotificationResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Transactional
    public void send(String receiver, String sender, Article article) {
        User userOfReceiver = userService.findByEmail(receiver);
        User userOfSender = userService.findByEmail(sender);
        Notification notification = new Notification(userOfReceiver.getEmail(),
            userOfSender.getEmail(), article);
        notificationRepository.save(notification);
    }

    @Transactional
    public List<NotificationResponse> lookUpMyNotifications(String author,
        PageRequest pageRequest) {
        Page<Notification> notifications = notificationRepository
            .findAllByReceiver(author, pageRequest.of());

        return notifications.stream().map(notification -> {
            String title = notification.getArticle().getTitle();
            String emailOfSender = notification.getSender();
            User userOfSender = userService.findByEmail(emailOfSender);
            String nicknameOfSender = userOfSender.getNickname();
            LocalDateTime when = notification.getCreatedAt();
            return new NotificationResponse(notification.getId(), title, nicknameOfSender, when);
        }).collect(Collectors.toList());
    }


    @Transactional
    public void read(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(() -> new IllegalArgumentException(
            String.format("해당 알림(%s)는 존재하지 않습니다.", notificationId)
        ));
        notification.read();
    }
}
