package com.selection.controller.article;

import com.nimbusds.oauth2.sdk.ErrorResponse;
import com.selection.dto.BaseResponseDto;
import com.selection.dto.ErrorResponseDto;
import com.selection.dto.SuccessResponseDto;
import com.selection.dto.article.ArticleResponseDto;
import com.selection.dto.article.ArticleSaveRequestDto;
import com.selection.service.article.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api")
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

    @GetMapping({"/article/", "/article/{id}"})
    public ResponseEntity<BaseResponseDto> readArticle(@PathVariable Optional<Long> id) {
        ErrorResponseDto error = ErrorResponseDto.builder()
                .errorCode(1)
                .errorMessage("올바르지 않은 게시글 번호입니다.")
                .errorMessageDetail("해당 게시글은 삭제되었거나 존재하지 않습니다.")
                .build();

        if (!id.isPresent() ) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(error.getStatus()));
        }

        ArticleResponseDto article = articleService.findArticleFromId(id.get());
        if (article == null) {
            return new ResponseEntity<>(error, HttpStatus.valueOf(error.getStatus()));
        }

        SuccessResponseDto success = SuccessResponseDto.builder()
                .message("게시글 정보를 성공적으로 불러왔습니다.")
                .data(article)
                .build();

        return new ResponseEntity<>(success, HttpStatus.valueOf(success.getStatus()));
    }

    @GetMapping({"/notices", "/notices/{page}"})
    public ResponseEntity<BaseResponseDto> readNotices(@PathVariable Optional<Long> page) {
        return null;
    }
}
