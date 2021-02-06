package com.selection.service.article;


import com.selection.domain.article.Article;
import com.selection.domain.question.Questions;
import com.selection.domain.tag.Tags;
import com.selection.dto.article.ArticleLatestResponse;
import com.selection.dto.article.ArticleModifyRequest;
import com.selection.dto.article.ArticleResponse;
import com.selection.dto.article.ArticleSaveRequest;
import com.selection.dto.notice.PageRequest;
import com.selection.dto.question.QuestionModifyRequest;
import com.selection.dto.tag.TagModifyRequest;
import com.selection.repository.ArticleRepository;
import java.util.List;
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

    @Transactional
    public Long create(ArticleSaveRequest requestDto) {
        Article article = articleRepository.save(requestDto.toEntity());
        return article.getId();
    }

    @Transactional
    public ArticleResponse modify(Long id, ArticleModifyRequest requestDto) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(id + "는 존재하지 않는 게시글 번호입니다."));

        article.modifyTitle(requestDto.getTitle());
        article.modifyContent(requestDto.getContent());
        article.modifyBackgroundColor(requestDto.getBackgroundColor());

        Questions questions = article.getQuestions();
        Tags tags = article.getTags();

        for (QuestionModifyRequest modifyQuestion : requestDto.getQuestions()) {
            questions
                .modifyQuestionDescription(modifyQuestion.getId(), modifyQuestion.getDescription());
        }
        for (TagModifyRequest modifyTag : requestDto.getTags()) {
            tags.modifyTagName(modifyTag.getId(), modifyTag.getName());
        }

        return new ArticleResponse(article);
    }

    @Transactional
    public ArticleResponse lookUp(Long id) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(id + "는 존재하지 않는 게시글 번호입니다."));
        return new ArticleResponse(article);
    }

    @Transactional
    public Long delete(Long id) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(id + "는 존재하지 않는 게시글 번호입니다."));
        articleRepository.delete(article);
        return article.getId();
    }

    @Transactional
    public List<ArticleLatestResponse> lookUpLatest(Long numOfLatestArticles) {
        PageRequest latest = PageRequest.builder()
            .page(1)
            .size(numOfLatestArticles.intValue())
            .direction(Direction.DESC)
            .build();

        Page<Article> latestArticles = articleRepository.findAll(latest.of());
        return latestArticles.stream().map(ArticleLatestResponse::new).collect(Collectors.toList());
    }
}
