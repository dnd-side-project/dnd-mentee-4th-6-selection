package com.selection.service.article;


import com.selection.domain.article.Article;
import com.selection.dto.article.ArticleResponse;
import com.selection.dto.article.ArticleSaveRequest;
import com.selection.repository.ArticleRepository;
import com.selection.repository.QuestionRepository;
import com.selection.repository.TagRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ArticleService {

  private final ArticleRepository articleRepository;
  private final TagRepository tagRepository;
  private final QuestionRepository questionRepository;


  @Transactional
  public ArticleResponse create(ArticleSaveRequest requestDto) {
    return new ArticleResponse(articleRepository.save(requestDto.toEntity()));
  }

  @Transactional
  public ArticleResponse getArticle(Long id) {
    Article article = articleRepository.findById(id).orElse(null);
    return article == null ? null : new ArticleResponse(article);
  }
}
