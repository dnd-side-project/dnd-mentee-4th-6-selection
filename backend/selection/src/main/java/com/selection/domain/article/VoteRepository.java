package com.selection.domain.article;

import com.selection.domain.article.Vote;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByAuthor(String author);
}
