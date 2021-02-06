package com.selection.domain.question;

import com.selection.dto.question.QuestionResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class Questions {

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>();

    public Questions(List<Question> questions) {
        this.questions = questions;
    }

    public void add(Question question) {
        this.questions.add(question);
    }

    public void addAll(List<Question> questions) {
        this.questions.addAll(questions);
    }

    public void modifyQuestionDescription(Long id, String description) {
        for (Question question : questions) {
            if (question.getId().equals(id)) {
                question.modifyDescription(description);
            }
        }
    }

    public List<QuestionResponse> toResponses() {
        return questions.stream().map((QuestionResponse::new)).collect(Collectors.toList());
    }

}
