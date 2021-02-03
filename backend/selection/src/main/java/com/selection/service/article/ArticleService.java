package com.selection.service.article;


import com.selection.domain.article.Article;
import com.selection.dto.article.ArticleResponse;
import com.selection.dto.article.ArticleSaveRequest;
import com.selection.repository.ArticleRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Transactional
    public ArticleResponse create(ArticleSaveRequest requestDto) {
        return new ArticleResponse(articleRepository.save(requestDto.toEntity()));
    }

    @Transactional
    public ArticleResponse getArticle(Long id) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(id + "는 존재하지 않는 게시글 번호입니다."));
        return new ArticleResponse(article);
    }
}
