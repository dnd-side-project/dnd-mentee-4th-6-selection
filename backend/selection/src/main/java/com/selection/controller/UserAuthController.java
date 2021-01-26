package com.selection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserAuthController {

    @GetMapping("/login_success")
    public ResponseEntity loginSuccessTest() {
        return ResponseEntity.ok()
            .body("success");
    }

    @GetMapping("/login_failed")
    public ResponseEntity loginFailureTest() {
        return ResponseEntity.ok()
            .body("fail");
    }
}
