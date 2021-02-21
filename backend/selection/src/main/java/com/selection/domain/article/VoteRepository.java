package com.selection.domain.article;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByAuthor(String author);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Vote v WHERE v.choice.id in :choiceIds")
    void deleteAllByInQuery(@Param("choiceIds") List<Long> choiceIds);
}
