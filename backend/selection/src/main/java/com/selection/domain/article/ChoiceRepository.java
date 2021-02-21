package com.selection.domain.article;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("SELECT c.id FROM Choice c WHERE c.article.id = :articleId")
    List<Long> findChoiceIdsByArticle(@Param("articleId") Long articleId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Choice c WHERE c.id in :choiceIds")
    void deleteAllInByInQuery(@Param("choiceIds") List<Long> choiceIds);
}
