package com.selection.controller;

import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.goguma.GogumaResponse;
import com.selection.service.goguma.GogumaService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/articles")
public class GogumaController {

    private final GogumaService gogumaService;

    private String getAuthor() {
        return "애플"; // 차후 Token으로 구하여 연동
    }

    @PostMapping("/{articleId}/gogumas")
    public ResponseEntity<?> createGoguma(@PathVariable Long articleId,
        @RequestBody @Valid GogumaRequest gogumaRequest) {
        gogumaService.create(articleId, getAuthor(), gogumaRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<?> modifyGoguma(@PathVariable Long articleId,
        @PathVariable Long gogumaId,
        @RequestBody @Valid GogumaRequest gogumaRequest) {
        gogumaService.modify(articleId, gogumaId, gogumaRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<GogumaResponse> lookUpGoguma(@PathVariable Long articleId,
        @PathVariable Long gogumaId) {
        GogumaResponse gogumaResponse = gogumaService.lookUp(articleId, gogumaId);
        return ResponseEntity.ok(gogumaResponse);
    }

    @DeleteMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<?> deleteGoguma(@PathVariable Long articleId,
        @PathVariable Long gogumaId) {
        gogumaService.delete(articleId, gogumaId);
        return ResponseEntity.ok().build();
    }
}
