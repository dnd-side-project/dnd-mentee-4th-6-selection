package com.selection.controller;


import com.selection.domain.article.ArticleService;
import com.selection.domain.notification.NotificationService;
import com.selection.domain.user.LoginUser;
import com.selection.domain.user.Role.ROLES;
import com.selection.dto.PageRequest;
import com.selection.dto.article.ArticleSummaryResponse;
import com.selection.dto.notification.NotificationResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
@Secured(ROLES.USER)
public class UserController {

    private final ArticleService articleService;
    private final NotificationService notificationService;

    @ApiOperation(value = "내가 쓴 글 조회", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "내가 쓴 글",
                response = ArticleSummaryResponse.class,
                responseContainer = "list"
            ),
        }
    )
    @GetMapping("/me/article")
    public List<ArticleSummaryResponse> lookUpMyArticlesWithPaging(
        @ApiParam(value = "페이지(1페이지당 15개)") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(hidden = true) @LoginUser String author) {

        PageRequest pr = new PageRequest(page, 15, Direction.DESC);
        return articleService.lookUpMyArticles(author, pr);

    }

    @ApiOperation(value = "알림 조회", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "알림 목록",
                response = NotificationResponse.class,
                responseContainer = "list"
            ),
        }
    )
    @GetMapping("/me/notifications")
    public List<NotificationResponse> lookUpMyNotificationsWithPaging(
        @ApiParam(value = "페이지(1페이지당 15개)") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(hidden = true) @LoginUser String author
    ) {
        PageRequest pr = new PageRequest(page, 15, Direction.DESC);
        return notificationService.lookUpMyNotifications(author, pr);
    }

    @ApiOperation(value = "알림 읽음", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "읽기 성공"),
            @ApiResponse(code = 500, message = "읽기 실패(존재하지 않는 알림)"),
        }
    )
    @GetMapping("/me/notifications/{notificationId}")
    public void readNotification(
        @ApiParam(value = "알림 번호", required = true) @PathVariable Long notificationId) {
        notificationService.read(notificationId);
    }

    @ApiOperation(value = "알림 삭제", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "읽기 성공"),
            @ApiResponse(code = 500, message = "읽기 실패(존재하지 않는 알림)"),
        }
    )
    @DeleteMapping("/me/notifications/{notificationId}")
    public void deleteNotification(
        @ApiParam(value = "알림 번호", required = true) @PathVariable Long notificationId) {
        notificationService.delete(notificationId);
    }


}
