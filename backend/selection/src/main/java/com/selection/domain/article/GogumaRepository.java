package com.selection.domain.article;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GogumaRepository extends JpaRepository<Goguma, Long> {


    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Goguma g WHERE g.id = :gogumaId")
    void deleteById(@Param("gogumaId") Long gogumaId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("DELETE from Goguma g WHERE g.article.id = :articleId")
    void deleteAllByInArticleId(@Param("articleId") Long articleId);
}
