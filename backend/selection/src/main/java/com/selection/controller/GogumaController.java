package com.selection.controller;

import com.selection.domain.article.GogumaService;
import com.selection.domain.user.LoginUser;
import com.selection.domain.user.Role.ROLES;
import com.selection.dto.PageRequest;
import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.goguma.GogumaResponse;
import com.selection.dto.goguma.GogumaSummaryResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/articles")
public class GogumaController {

    private final GogumaService gogumaService;

    @ApiOperation(value = "고구마 작성", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "고구마 작성 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "고구마 작성 실패 이유 정보")
        }
    )
    @Secured(ROLES.USER)
    @PostMapping("/{articleId}/gogumas")
    public ResponseEntity<Long> createGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 정보", required = true) @RequestBody @Valid GogumaRequest gogumaRequest,
        @ApiParam(hidden = true) @LoginUser String userId) {
        Long gogumaId = gogumaService.create(articleId, userId, gogumaRequest);
        return ResponseEntity.ok(gogumaId);
    }

    @ApiOperation(value = "고구마 수정", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "고구마 수정 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "고구마 수정 실패 이유 정보")
        }
    )
    @Secured(ROLES.USER)
    @PutMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<?> modifyGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 번호", required = true) @PathVariable Long gogumaId,
        @ApiParam(value = "고구마 정보", required = true) @RequestBody @Valid GogumaRequest gogumaRequest,
        @ApiParam(hidden = true) @LoginUser String userId) {
        gogumaService.modify(articleId, gogumaId, userId, gogumaRequest);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "고구마 조회", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "고구마 조회 성공", response = GogumaResponse.class),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "고구마 조회 실패 이유 정보")
        }
    )
    @GetMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<GogumaResponse> lookUpGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 번호", required = true) @PathVariable Long gogumaId,
        @ApiParam(hidden = true) @LoginUser String userId) {
        return ResponseEntity.ok(gogumaService.lookUp(articleId, gogumaId, userId));
    }

    @ApiOperation(value = "고구마 바구니 조회", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "고구마 바구니 조회 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "고구마 바구니 조회 실패 정보")
        }
    )
    @GetMapping("/{articleId}/gogumas")
    public ResponseEntity<List<GogumaSummaryResponse>> lookUpGogumaBasket(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "페이지 번호") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(value = "페이지당 게시글 수") @RequestParam(required = false, defaultValue = "5") int size,
        @ApiParam(hidden = true) @LoginUser String userId
    ) {
        PageRequest pr = new PageRequest(page, size, Direction.ASC);
        return ResponseEntity.ok(gogumaService.lookUpBasket(articleId, userId, pr));
    }

    @ApiOperation(value = "고구마 삭제", tags = "고구마 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "고구마 삭제 성공"),
            @ApiResponse(code = 401, message = "올바르지 않은 접근 경로(인증문제)"),
            @ApiResponse(code = 500, message = "고구마 삭제 실패 이유 정보")
        }
    )
    @Secured(ROLES.USER)
    @DeleteMapping("/{articleId}/gogumas/{gogumaId}")
    public ResponseEntity<?> deleteGoguma(
        @ApiParam(value = "게시글 번호", required = true) @PathVariable Long articleId,
        @ApiParam(value = "고구마 번호", required = true) @PathVariable Long gogumaId,
        @ApiParam(hidden = true) @LoginUser String userId) {
        gogumaService.delete(articleId, gogumaId, userId);
        return ResponseEntity.ok().build();
    }
}
