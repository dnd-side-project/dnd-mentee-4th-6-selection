package com.selection.domain.article;

import com.selection.dto.goguma.GogumaSummaryResponse;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(
        value =
          "SELECT new com.selection.dto.goguma.GogumaSummaryResponse("
        + "g.id, g.gogumaType, "
        + "case when g.userId = :userId then true else false end,"
        + "g.isRead,"
        + "case when LENGTH(g.message) > 0 then true else false end) "
        + "FROM Goguma g WHERE g.article.id = :articleId"
    )
    Page<GogumaSummaryResponse> findGogumas(@Param("userId") String userId, @Param("articleId") Long articleId,
        Pageable pageable);
}
