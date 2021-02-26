package com.selection.controller;


import com.selection.domain.article.ArticleService;
import com.selection.domain.notification.NotificationService;
import com.selection.domain.user.LoginUser;
import com.selection.domain.user.Role.ROLES;
import com.selection.domain.user.UserService;
import com.selection.dto.PageRequest;
import com.selection.dto.article.ArticleSummaryResponse;
import com.selection.dto.notification.NotificationResponse;
import com.selection.dto.user.ProfileRequest;
import com.selection.dto.user.ProfileResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    private final UserService userService;

    @ApiOperation(value = "내 정보 조회", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "내 정보 조회 성공",
                response = ProfileResponse.class,
                responseContainer = "list"
            ),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "내 정보 조회 실패 이유 정보"),
        }
    )
    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> lookUpMyProfile(
        @ApiParam(hidden = true) @LoginUser String userId) {
        return ResponseEntity.ok(userService.lookUpMyProfile(userId));
    }

    @ApiOperation(value = "내가 쓴 글 조회", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "내가 쓴 글 조회 성공",
                response = ArticleSummaryResponse.class,
                responseContainer = "list"
            ),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "내가 쓴 글 조회 실패 이유 정보"),
        }
    )
    @GetMapping("/me/article")
    public ResponseEntity<List<ArticleSummaryResponse>> lookUpMyArticlesWithPaging(
        @ApiParam(value = "페이지(1페이지당 15개)") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(hidden = true) @LoginUser String userId) {

        PageRequest pr = new PageRequest(page, 15, Direction.DESC);
        return ResponseEntity.ok(articleService.lookUpMyArticles(userId, pr));

    }

    @ApiOperation(value = "알림 조회", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "알림 목록 조회 성공",
                response = NotificationResponse.class,
                responseContainer = "list"
            ),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "알림 목록 조회 실패 이유 정보"),
        }
    )
    @GetMapping("/me/notifications")
    public ResponseEntity<List<NotificationResponse>> lookUpMyNotificationsWithPaging(
        @ApiParam(value = "페이지(1페이지당 15개)") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(hidden = true) @LoginUser String userId
    ) {
        PageRequest pr = new PageRequest(page, 15, Direction.DESC);
        return ResponseEntity.ok(notificationService.lookUpMyNotifications(userId, pr));
    }

    @ApiOperation(value = "알림 읽기", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "알림 읽기 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "알림 읽기 실패 이유 정보"),
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
            @ApiResponse(code = 200, message = "알림 삭제 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "알림 삭제 실패 이유 정보"),
        }
    )
    @DeleteMapping("/me/notifications/{notificationId}")
    public void deleteNotification(
        @ApiParam(value = "알림 번호", required = true) @PathVariable Long notificationId) {
        notificationService.delete(notificationId);
    }

    @ApiOperation(value = "닉네임 변경", tags = "마이페이지 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "닉네임 변경 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "닉네임 변경 실패 이유 정보"),
        }
    )
    @PostMapping("/me")
    public ResponseEntity<?> modifyNickname(
        @ApiParam(value = "닉네임", required = true) @RequestBody @Valid ProfileRequest profileRequest,
        @ApiParam(hidden = true) @LoginUser String userId) {
        userService.modifyNickName(userId, profileRequest.getNickname());
        return ResponseEntity.ok().build();
    }
}
