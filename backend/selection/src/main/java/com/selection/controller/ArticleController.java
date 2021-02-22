package com.selection.controller;

import com.selection.domain.article.ArticleService;
import com.selection.domain.user.LoginUser;
import com.selection.domain.user.Role.ROLES;
import com.selection.dto.article.ArticleRequest;
import com.selection.dto.article.ArticleResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    @ApiOperation(value = "게시글 작성", tags = "게시글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "게시글 번호", response = Long.class),
            @ApiResponse(code = 500, message = "존재하지 않는 게시글")
        }
    )
    @Secured(ROLES.USER)
    @PostMapping
    public ResponseEntity<Long> createArticle(
        @ApiParam(value = "게시글 정보", required = true) @RequestBody @Valid ArticleRequest articleRequest,
        @ApiParam(hidden  = true) @LoginUser String userId) {
        return ResponseEntity.ok(articleService.create(userId, articleRequest));
    }

    @ApiOperation(value = "게시글 수정", tags = "게시글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 500, message = "수정 실패")
        }
    )
    @Secured(ROLES.USER)
    @PutMapping("/{articleId}")
    public ResponseEntity<?> modifyArticle(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "게시글 정보", required = true) @RequestBody @Valid ArticleRequest articleRequest,
        @ApiParam(hidden = true) @LoginUser String userId) {
        articleService.modify(articleId, userId,articleRequest);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "게시글 조회", tags = "게시글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "조회 성공", response = ArticleResponse.class),
            @ApiResponse(code = 500, message = "조회 실패(존재하지 않는 게시글일 경우)")
        }
    )
    @GetMapping("/{articleId}")
    public ResponseEntity<ArticleResponse> lookUpArticle(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(hidden = true) @LoginUser String userId) {
        return ResponseEntity.ok(articleService.lookUp(articleId, userId));
    }

    @ApiOperation(value = "게시글 삭제", tags = "게시글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 500, message = "삭제 실패(존재하지 않는 게시글일 경우)")
        }
    )
    @Secured(ROLES.USER)
    @DeleteMapping("/{articleId}")
    public ResponseEntity<?> deleteArticle(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(hidden = true) @LoginUser String userId) {
        articleService.delete(articleId, userId);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "선택지 투표", tags = "선택지 투표 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "투표 성공"),
            @ApiResponse(code = 500, message = "투표 실패(존재하지 않는 선택지이거나 게시글일 경우)")
        }
    )
    @Secured(ROLES.USER)
    @PostMapping("/{articleId}/choices/{choiceId}")
    public ResponseEntity<?> voteOnChoice(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "선택지 번호", required = true) @PathVariable Long choiceId,
        @ApiParam(hidden = true) @LoginUser String userId) {
        articleService.vote(articleId, choiceId, userId);
        return ResponseEntity.ok().build();
    }
}
