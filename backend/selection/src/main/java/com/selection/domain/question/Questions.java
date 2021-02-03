package com.selection.domain.question;

import com.selection.dto.question.QuestionResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class Questions {

  @OneToMany(mappedBy = "article", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  private Set<Question> questions = new HashSet<>();

  public Questions(List<Question> questions) {
    this.questions = new HashSet<>(questions);
  }

  public void add(Question question) {
    this.questions.add(question);
  }

  public void addAll(List<Question> questions) {
    this.questions.addAll(questions);
  }

  public List<QuestionResponse> toResponses() {
    return questions.stream().map((QuestionResponse::new)).collect(Collectors.toList());
  }

}
