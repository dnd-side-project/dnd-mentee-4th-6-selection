package com.selection.controller;

import com.selection.dto.MyInfoResponse;
import com.selection.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

    /* 프론트와 상의 후 결정 */
/*
    @GetMapping("/me/articles")
    public ResponseEntity<List<ArticleResponse>> findMyArticles(PageRequest pageRequest) {
        List<ArticleResponse> articles = userService.findMyArticles(pageRequest);

        return ResponseEntity.ok()
            .body(articles);
    }
*/
}
