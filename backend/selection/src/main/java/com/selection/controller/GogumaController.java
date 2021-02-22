package com.selection.controller;

import com.selection.domain.user.LoginUser;
import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.goguma.GogumaResponse;
import com.selection.domain.article.GogumaService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

    @ApiOperation(value = "고구마 작성", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 500, message = "작성 실패")
        }
    )
    @PostMapping("/{articleId}/gogumas")
    public ResponseEntity<?> createGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 정보", required = true) @RequestBody @Valid GogumaRequest gogumaRequest,
        @ApiParam(hidden = true) @LoginUser String author) {
        gogumaService.create(articleId, author, gogumaRequest);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "고구마 수정", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 500, message = "수정 실패")
        }
    )
    @PutMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<?> modifyGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 번호", required = true) @PathVariable Long gogumaId,
        @ApiParam(value = "고구마 정보", required = true) @RequestBody @Valid GogumaRequest gogumaRequest) {
        gogumaService.modify(articleId, gogumaId, gogumaRequest);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "고구마 조회", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "조회 성공", response = GogumaResponse.class),
            @ApiResponse(code = 500, message = "조회 실패")
        }
    )
    @GetMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<GogumaResponse> lookUpGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long gogumaId) {
        GogumaResponse gogumaResponse = gogumaService.lookUp(articleId, gogumaId);
        return ResponseEntity.ok(gogumaResponse);
    }

    @ApiOperation(value = "고구마 삭제", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 500, message = "삭제 실패")
        }
    )
    @DeleteMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<?> deleteGoguma(
        @ApiParam(value = "게시글 번호",required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 번호",required = true) @PathVariable Long gogumaId) {
        gogumaService.delete(articleId, gogumaId);
        return ResponseEntity.ok().build();
    }
}
