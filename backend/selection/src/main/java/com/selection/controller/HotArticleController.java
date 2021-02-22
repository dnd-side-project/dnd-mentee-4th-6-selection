package com.selection.controller;

import com.selection.domain.article.ArticleService;
import com.selection.dto.PageRequest;
import com.selection.dto.article.ArticleSummaryResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/hot")
public class HotArticleController {

    private final ArticleService articleService;

    @ApiOperation(value = "갓 구운 고구마 API", tags = "인기글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "조회 성공"),
        }
    )
    @GetMapping("/drafts")
    public ResponseEntity<List<ArticleSummaryResponse>> lookUpArticlesInDraft(
        @ApiParam(value = "페이지 번호") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(value = "페이지당 게시글 수") @RequestParam(required = false, defaultValue = "5") int size) {

        PageRequest pr = new PageRequest(page, size, Direction.DESC);
        List<ArticleSummaryResponse> articles = articleService.lookUpInDrafts(pr);
        return ResponseEntity.ok(articles);
    }

    @ApiOperation(value = "불타는 고구마 API", tags = "인기글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "조회 성공"),
        }
    )
    @GetMapping("/fires")
    public ResponseEntity<List<ArticleSummaryResponse>> lookUpArticleInFires(
        @ApiParam(value = "페이지 번호") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(value = "페이지당 게시글 수") @RequestParam(required = false, defaultValue = "5") int size) {

        PageRequest pr = new PageRequest(page, size, Direction.DESC);
        List<ArticleSummaryResponse> articles = articleService.lookUpInFires(pr);
        return ResponseEntity.ok(articles);
    }

    @ApiOperation(value = "명예 고구마 API", tags = "인기글 API")
    @ApiResponses(
        value = {
            @ApiResponse(code = 200, message = "조회 성공"),
        }
    )
    @GetMapping("/honors")
    public ResponseEntity<List<ArticleSummaryResponse>> lookUpArticleInFires(
        @ApiParam(value = "페이지 번호") @RequestParam(required = false, defaultValue = "1") int page,
        @ApiParam(value = "페이지당 게시글 수") @RequestParam(required = false, defaultValue = "5") int size,
        @ApiParam(value = "날짜", required = true) @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate when) {

        PageRequest pr = new PageRequest(page, size, Direction.DESC);
        List<ArticleSummaryResponse> articles = articleService.lookUpInHonors(when, pr);
        return ResponseEntity.ok(articles);
    }
}
