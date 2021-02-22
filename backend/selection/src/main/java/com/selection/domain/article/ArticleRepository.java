package com.selection.domain.article;

import com.selection.dto.article.ArticleSummaryProjection;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Article a WHERE a.id = :articleId")
    void deleteById(@Param("articleId") Long articleId);

    @Query(nativeQuery = true,
        value = "SELECT a.id AS id, a.title AS title, a.content AS content, "
            + "a.created_at AS createdAt, a.user_id AS userId, "
            + "(SELECT COUNT(*) FROM gogumas AS g WHERE g.article_id = a.id) AS numOfGogumas "
            + "FROM articles AS a "
            + "WHERE a.user_id = :userId"
    )
    List<ArticleSummaryProjection> findAllByAuthor(@Param("userId") String userId, Pageable pageable);

    @Query(nativeQuery = true,
        value = "SELECT a.id AS id, a.title AS title, a.content AS content, "
            + "a.created_at AS createdAt, a.user_id AS userId, "
            + "(SELECT COUNT(*) FROM gogumas AS g WHERE g.article_id = a.id) AS numOfGogumas "
            + "FROM articles AS a"
    )
    List<ArticleSummaryProjection> findDraftGogumas(Pageable pageable);

    @Query(nativeQuery = true,
        value = "SELECT a.id AS id, a.title AS title, a.content AS content, "
            + "a.created_at AS createdAt, a.user_id AS userId, "
            + "(SELECT COUNT(*) FROM gogumas AS g WHERE g.article_id = a.id) AS numOfGogumas "
            + "FROM articles AS a GROUP BY a.id HAVING (numOfGogumas >= 10 AND numOfGogumas < 50)"
    )
    List<ArticleSummaryProjection> findFireGogumas(Pageable pageable);

    @Query(nativeQuery = true,
        value = "SELECT a.id AS id, a.title AS title, a.content AS content, "
            + "a.created_at AS createdAt, a.user_id AS userId, "
            + "(SELECT COUNT(*) FROM gogumas AS g WHERE g.article_id = a.id) AS numOfGogumas "
            + "FROM articles AS a WHERE date(a.created_at) = :when"
    )
    List<ArticleSummaryProjection> findHonorGogumasAtTime(@Param("when") LocalDate when, Pageable pageable);
}
