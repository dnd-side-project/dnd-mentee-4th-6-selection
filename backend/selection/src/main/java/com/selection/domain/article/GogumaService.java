package com.selection.domain.article;

import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.goguma.GogumaResponse;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GogumaService {

    private final ArticleService articleService;

    private final GogumaRepository gogumaRepository;
    @Transactional
    public void create(Long articleId, String author, GogumaRequest gogumaRequest) {
        Article article = articleService.findArticleById(articleId);
        article.addGoguma(gogumaRequest.toEntity(author, article));
    }

    @Transactional
    public void modify(Long articleId, Long gogumaId, GogumaRequest gogumaRequest) {
        Article article = articleService.findArticleById(articleId);
        article.modifyGoguma(gogumaId, gogumaRequest);
    }

    @Transactional
    public GogumaResponse lookUp(Long articleId, Long gogumaId) {
        Article article = articleService.findArticleById(articleId);
        return new GogumaResponse(article.lookUpGoguma(gogumaId));
    }

    @Transactional
    public void delete(Long articleId, Long gogumaId) {
        Article article = articleService.findArticleById(articleId);
        gogumaRepository.deleteById(gogumaId);
    }
}
