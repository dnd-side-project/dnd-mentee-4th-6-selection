package com.selection.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class OAuth2Controller {

    @GetMapping("/oauth2/redirect")
    public ResponseEntity<String> redirectTest(@RequestParam(value = "token")
        String token) {
        return ResponseEntity.ok()
            .body("token : " + token);
    }
}
