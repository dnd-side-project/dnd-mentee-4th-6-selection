package com.selection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // Todo: 프론트 연결된 이후엔 삭제할 것
    @GetMapping("/oauth2/redirect")
    public ResponseEntity<String> test(@RequestParam(value = "token", required = true)
            String token) {
        return ResponseEntity.ok()
            .body("token : " + token);
    }
}
