package com.selection.domain.article;

import com.selection.domain.article.Goguma;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GogumaRepository extends JpaRepository<Goguma, Long> {
    Optional<Goguma> findByIdAndArticleId(Long id, Long articleId);
}
