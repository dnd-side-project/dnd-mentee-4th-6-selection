package com.selection.repository;

import com.selection.domain.article.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Choice, Long> {
}
