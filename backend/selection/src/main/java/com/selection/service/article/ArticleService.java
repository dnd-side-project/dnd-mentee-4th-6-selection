package com.selection.service.article;


import com.selection.domain.article.Article;
import com.selection.dto.article.ArticleResponseDto;
import com.selection.dto.article.ArticleSaveRequestDto;
import com.selection.repository.ArticleRepository;
import com.selection.repository.QuestionRepository;
import com.selection.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final TagRepository tagRepository;
    private final QuestionRepository questionRepository;


    @Transactional
    public ArticleResponseDto create(ArticleSaveRequestDto requestDto) {
        Article article = articleRepository.save(requestDto.toEntity());
        return new ArticleResponseDto(article);
    }
}
