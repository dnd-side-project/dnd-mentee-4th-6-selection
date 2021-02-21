package com.selection.domain.article;


import com.selection.dto.PageRequest;
import com.selection.dto.article.ArticleLatestResponse;
import com.selection.dto.article.ArticleRequest;
import com.selection.dto.article.ArticleResponse;
import com.selection.dto.article.ArticleSummaryProjection;
import com.selection.dto.article.ArticleSummaryResponse;
import com.selection.dto.goguma.GogumaResponse;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final VoteRepository voteRepository;
    private final ChoiceRepository choiceRepository;
    private final GogumaRepository gogumaRepository;
    public Article findArticleById(Long articleId) {
        return articleRepository.findById(articleId)
            .orElseThrow(
                () -> new IllegalArgumentException(
                    String.format("해당 게시글(%s)는 존재하지 않습니다.", articleId)));
    }

    public Long findChoiceIdByVotedAuthor(String author) {
        Optional<Vote> vote = voteRepository.findByAuthor(author);
        return vote.isPresent() ? vote.get().getChoice().getId() : -1L;
    }

    @Transactional
    public Long create(String author, ArticleRequest requestDto) {
        Article article = articleRepository.save(requestDto.toEntity(author));
        return article.getId();
    }

    @Transactional
    public void modify(Long articleId, ArticleRequest requestDto) {
        Article article = findArticleById(articleId);

        article.modifyTitle(requestDto.getTitle());
        article.modifyContent(requestDto.getContent());
        article.modifyChoices(requestDto.getChoices());
    }

    @Transactional
    public ArticleResponse lookUp(Long articleId, String author) {
        return new ArticleResponse(findArticleById(articleId), findChoiceIdByVotedAuthor(author));
    }

    @Transactional
    public void delete(Long articleId) {
        gogumaRepository.deleteAllByInArticleId(articleId);
        List<Long> choiceIds = choiceRepository.findChoiceIdsByArticle(articleId);
        voteRepository.deleteAllByInQuery(choiceIds);
        choiceRepository.deleteAllInByInQuery(choiceIds);
        articleRepository.deleteById(articleId);
    }

    @Transactional
    public void vote(Long articleId, Long choiceId, String author) {
        Article article = findArticleById(articleId);
        article.voteOnChoice(choiceId, author);
    }

    @Transactional
    public List<ArticleLatestResponse> lookUpLatest(Long numOfLatestArticles) {
        PageRequest latest = new PageRequest(1, numOfLatestArticles.intValue(), Direction.DESC);
        Page<Article> latestArticles = articleRepository.findAll(latest.of());

        return latestArticles.stream()
            .map(ArticleLatestResponse::new)
            .collect(Collectors.toList());
    }

    public List<ArticleSummaryResponse> lookUpMyArticles(String author, PageRequest pageRequest) {
        List<ArticleSummaryProjection> pagesWithMyArticles =
            articleRepository.findAllByAuthor(author, pageRequest.of());
        return pagesWithMyArticles.stream().map(ArticleSummaryResponse::new)
            .collect(Collectors.toList());
    }
}
