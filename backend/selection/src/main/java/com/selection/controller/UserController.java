package com.selection.controller;

import com.selection.domain.user.User;
import com.selection.exception.ResourceNotFoundException;
import com.selection.repository.UserRepository;
import com.selection.security.CurrentUser;
import com.selection.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/oauth2/redirect")
    public ResponseEntity<String> test(@RequestParam(value = "token", required = true)
            String token) {
        return ResponseEntity.ok()
            .body("token : " + token);
    }
}
