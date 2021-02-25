package com.selection.controller;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class OAuth2Controller {

    @GetMapping("/oauth2/redirect")
    public ResponseEntity<Map<String, String>> redirectTest(@RequestParam(value = "token")
        String token) {
        Map<String, String> tokenBody = new HashMap<>();
        tokenBody.put("token", token);
        return ResponseEntity.ok(tokenBody);
    }
}
