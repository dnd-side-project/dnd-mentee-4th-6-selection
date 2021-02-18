package com.selection.controller;

import com.selection.dto.MyInfoResponse;
import com.selection.dto.PageRequest;
import com.selection.dto.article.ArticleResponse;
import com.selection.security.user.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<MyInfoResponse> findMyInfo() {
        MyInfoResponse myInfoResponse = userService.findMyInfo();

        return ResponseEntity.ok()
            .body(myInfoResponse);
    }

    @GetMapping("/me/articles")
    public ResponseEntity<List<ArticleResponse>> findMyArticles(PageRequest pageRequest) {
        List<ArticleResponse> articles = userService.findMyArticles(pageRequest);

        return ResponseEntity.ok()
            .body(articles);
    }

    // Todo: 프론트 연결된 이후엔 삭제할 것
    @GetMapping("/oauth2/redirect")
    public ResponseEntity<String> redirectTest(@RequestParam(value = "token", required = true)
        String token) {
        return ResponseEntity.ok()
            .body("token : " + token);
    }

    // Todo: 프론트 연결된 이후엔 삭제할 것
    @GetMapping("/")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok()
            .body("메인화면 - 누구나 접근 가능");
    }
}
