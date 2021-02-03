package com.selection.dto.tag;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.article.Article;
import com.selection.domain.tag.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class TagSaveRequest {

  private String name;

  @JsonCreator
  public TagSaveRequest(String name) {
    this.name = name;
  }

  public Tag toEntity(Article article) {
    return Tag.builder()
        .name(name)
        .article(article)
        .build();
  }
}
