package com.selection.domain.article;

import com.selection.domain.notification.NotificationService;
import com.selection.domain.user.User;
import com.selection.domain.user.UserService;
import com.selection.dto.PageRequest;
import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.goguma.GogumaResponse;
import com.selection.dto.goguma.GogumaSummaryResponse;
import java.util.List;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GogumaService {

    private final ArticleService articleService;
    private final NotificationService notificationService;
    private final UserService userService;
    private final GogumaRepository gogumaRepository;

    @Transactional
    public Long create(Long articleId, String userId, GogumaRequest gogumaRequest) {
        Article article = articleService.findArticleById(articleId);
        Goguma goguma = gogumaRepository.save(gogumaRequest.toEntity(userId, article));
        article.addGoguma(goguma);
        notificationService.send(userId, article.getUserId(), goguma);
        return goguma.getId();
    }

    @Transactional
    public void modify(Long articleId, Long gogumaId, String userId, GogumaRequest gogumaRequest) {
        Article article = articleService.findArticleById(articleId);
        article.modifyGoguma(gogumaId, userId, gogumaRequest);
    }

    @Transactional
    public GogumaResponse lookUp(Long articleId, Long gogumaId, String userId) {
        Article article = articleService.findArticleById(articleId);
        Goguma goguma = article.lookUpGoguma(gogumaId);

        if (goguma.getUserId().equals(userId)) {
            goguma.read();
        }

        User user = userService.findByUserId(goguma.getUserId());
        return new GogumaResponse(
            goguma,
            user.getNickname(),
            goguma.getUserId().equals(userId)
        );
    }

    @Transactional
    public List<GogumaSummaryResponse> lookUpBasket(Long articleId, String userId,
        PageRequest pageRequest) {
        Article article = articleService.findArticleById(articleId);
        Page<GogumaSummaryResponse> gogumaResponses =
            gogumaRepository.findGogumas(userId, article.getId(), pageRequest.of());
        return gogumaResponses.getContent();
    }

    @Transactional
    public void delete(Long articleId, Long gogumaId, String userId) {
        Article article = articleService.findArticleById(articleId);
        article.deleteGoguma(gogumaId, userId);
    }
}
