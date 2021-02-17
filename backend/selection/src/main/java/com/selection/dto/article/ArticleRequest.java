package com.selection.dto.article;

import com.selection.domain.article.Article;
import com.selection.domain.article.Choice;
import com.selection.dto.question.ChoiceRequest;
import com.selection.validation.ChoicesConstraint;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@NoArgsConstructor
public class ArticleRequest {

    @NotNull
    @Size(min = 1, max = 30, message = "제목은 최소 1자이상, 최대 30자이하만 가능합니다.")
    private String title;

    @NotNull
    @Size(min = 1, message = "내용은 최소 1자이상이여야합니다.")
    private String content;

    @NotNull
    @ChoicesConstraint
    private List<@Valid ChoiceRequest> choices;

    public ArticleRequest(
        @NotNull @Size(min = 1, max = 30, message = "제목은 최소 1자이상, 최대 30자이하만 가능합니다.") String title,
        @NotNull @Size(min = 1, message = "내용은 최소 1자이상이여야합니다.") String content,
        @NotNull List<@Valid ChoiceRequest> choices) {
        this.title = title;
        this.content = content;
        this.choices = choices;
    }

    public Article toEntity(@NotEmpty(message = "작성자는 필수입니다.") String author) {
        Article article = new Article(title, content, author);

        List<Choice> choiceEntities = choices.stream()
            .map(choiceRequest -> choiceRequest.toEntity(article))
            .collect(Collectors.toList());

        article.addChoices(choiceEntities);
        return article;
    }
}
