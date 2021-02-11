package com.selection.domain.question;

import com.google.common.collect.Sets;
import com.selection.domain.BaseEntity;
import com.selection.domain.article.Article;
import com.selection.dto.question.QuestionRequest;
import com.selection.dto.question.QuestionResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class Questions {

    @OneToMany(mappedBy = "article", orphanRemoval = true, cascade = CascadeType.ALL)
    private final List<Question> questions = new ArrayList<>();

    public int size() {
        return questions.size();
    }

    public Question get(int index) {
        return questions.get(index);
    }

    public void add(Question question) {
        this.questions.add(question);
    }

    public void addAll(List<Question> questions) {
        this.questions.addAll(questions);
    }

    private void delete(Long id) {
        questions.removeIf((question) -> question.getId().equals(id));
    }

    private void modifyContent(Long id, String content) {
        questions.stream()
            .filter(question -> question.getId().equals(id))
            .forEach((updateQuestion) -> updateQuestion.modifyContent(content));
    }

    public void modify(Article article, List<QuestionRequest> requestQuestions) {
        Set<Long> questionIds = questions.stream()
            .map(BaseEntity::getId)
            .collect(Collectors.toSet());

        Set<Long> modifyQuestionIds = requestQuestions.stream()
            .map(QuestionRequest::getId)
            .collect(Collectors.toSet());

        // 삭제
        Sets.difference(questionIds, modifyQuestionIds).forEach(this::delete);

        // 수정
        requestQuestions.stream()
            .filter(requestQuestion -> questionIds.contains(requestQuestion.getId()))
            .forEach(updateQuestion -> modifyContent(updateQuestion.getId(),
                updateQuestion.getContent()));

        // 추가
        requestQuestions.stream()
            .filter(requestQuestion -> !questionIds.contains(requestQuestion.getId()))
            .map(newQuestion -> newQuestion.toEntity(article))
            .forEach(this::add);
    }

    public List<QuestionResponse> toResponses() {
        return questions.stream()
            .map(QuestionResponse::new).collect(Collectors.toList());
    }
}
