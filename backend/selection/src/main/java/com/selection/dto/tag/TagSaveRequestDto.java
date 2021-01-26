package com.selection.dto.tag;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.article.Article;
import com.selection.domain.tag.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@NoArgsConstructor
@Getter
public class TagSaveRequestDto {
    private String name;

    @JsonCreator
    public TagSaveRequestDto(String name) {
        this.name = name;
    }

    public Tag toEntity(Article article) {
        return Tag.builder()
                .name(name)
                .article(article)
                .build();
    }
}
