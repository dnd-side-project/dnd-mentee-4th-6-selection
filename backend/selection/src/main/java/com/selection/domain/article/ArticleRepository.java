package com.selection.domain.article;

import com.selection.dto.article.ArticleSummaryProjection;
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
        value = "SELECT a.id as id, a.title as title, a.content as content, "
            + "a.created_at as createdAt, a.author as author, "
            + "(SELECT COUNT(*) FROM gogumas as g WHERE g.article_id = a.id) as numOfGogumas "
            + "FROM articles as a "
            + "WHERE a.author = :author "
    )
    List<ArticleSummaryProjection> findAllByAuthor(String author, Pageable pageable);
}
