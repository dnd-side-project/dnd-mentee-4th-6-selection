package com.selection.domain.notification;

import com.selection.advice.exception.NotificationNotFoundException;
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

    private Notification findById(Long notificationId) {
        return notificationRepository.findById(notificationId)
            .orElseThrow(() -> new NotificationNotFoundException(
                String.format("해당 알림(%s)는 존재하지 않습니다.", notificationId)
            ));
    }

    private NotificationResponse createNotification(Notification notification) {
        String title = notification.getArticle().getTitle();
        String userIdOfSender = notification.getSenderUserId();
        String nicknameOfSender = userService.findByUserId(userIdOfSender).getNickname();
        LocalDateTime when = notification.getCreatedAt();
        return new NotificationResponse(notification.getId(), title, nicknameOfSender, when);
    }

    @Transactional
    public void send(String userIdOfReceiver, String userIdOfSender, Article article) {
        User userOfReceiver = userService.findByUserId(userIdOfReceiver);
        User userOfSender = userService.findByUserId(userIdOfSender);
        Notification notification = new Notification(userOfReceiver.getUserId(),
            userOfSender.getUserId(), article);
        notificationRepository.save(notification);
    }

    @Transactional
    public List<NotificationResponse> lookUpMyNotifications(String userId,
        PageRequest pageRequest) {
        Page<Notification> notifications = notificationRepository
            .findAllByReceiverUserId(userId, pageRequest.of());

        return notifications.stream().map(this::createNotification)
            .collect(Collectors.toList());
    }


    @Transactional
    public void read(Long notificationId) {
        Notification notification = findById(notificationId);
        notification.read();
    }

    @Transactional
    public void delete(Long notificationId) {
        Notification notification = findById(notificationId);
        notificationRepository.deleteById(notification.getId());
    }
}
