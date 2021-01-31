package com.selection.controller.article;

import com.selection.dto.BaseResponseDto;
import com.selection.dto.ErrorResponseDto;
import com.selection.dto.SuccessResponseDto;
import com.selection.dto.article.ArticleResponseDto;
import com.selection.dto.article.ArticleSaveRequestDto;
import com.selection.dto.notice.NoticeResponseDto;
import com.selection.dto.notice.PageRequestDto;
import com.selection.service.article.ArticleService;
import com.selection.service.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ArticleApiController {

    private final ArticleService articleService;

    @PostMapping("/article")
    public ResponseEntity<BaseResponseDto> createArticle(@RequestBody ArticleSaveRequestDto requestDto) {
        ArticleResponseDto article = articleService.create(requestDto);

        SuccessResponseDto success = SuccessResponseDto.builder()
                .message("게시글이 성공적으로 등록되었습니다.")
                .data(article.getId())
                .build();

        return new ResponseEntity<>(success, HttpStatus.valueOf(success.getStatus()));
    }

    @PutMapping({"/article/", "/article/{id}"})
    public ResponseEntity<BaseResponseDto> modifyArticle(@PathVariable Optional<Long> id) {
        return null;
    }

    @GetMapping({"/article/", "/article/{id}"})
    public ResponseEntity<BaseResponseDto> getArticle(@PathVariable Optional<Long> id) {
        ErrorResponseDto error = ErrorResponseDto.builder()
                .errorCode(1)
                .errorMessage("올바르지 않은 게시글 번호입니다.")
                .errorMessageDetail("해당 게시글은 삭제되었거나 존재하지 않습니다.")
                .build();

        if (!id.isPresent() ) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(error.getStatus()));
        }

        ArticleResponseDto article = articleService.getArticle(id.get());
        if (article == null) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(error.getStatus()));
        }

        SuccessResponseDto success = SuccessResponseDto.builder()
                .message("게시글 정보를 성공적으로 불러왔습니다.")
                .data(article)
                .build();

        return new ResponseEntity<>(success, HttpStatus.valueOf(success.getStatus()));
    }

    @GetMapping("/articles")
    public ResponseEntity<BaseResponseDto> getArticles(PageRequestDto pageRequestDto) {
        return null;
    }

    @DeleteMapping({"/article", "/article/{id}"})
    public ResponseEntity<BaseResponseDto> deleteArticle(@PathVariable Optional<Long> id) {
        return null;
    }

    @GetMapping("/articles/latest")
    public ResponseEntity<BaseResponseDto> getLatestArticle() {
        return null;
    }

    @GetMapping("/articles/favorite")
    public ResponseEntity<BaseResponseDto> getFavoriteArticle() {
        return null;
    }


}
