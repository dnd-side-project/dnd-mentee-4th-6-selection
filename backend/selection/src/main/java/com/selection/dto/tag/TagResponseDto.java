package com.selection.dto.tag;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.tag.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class TagResponseDto {

    private Long id;
    private String name;

    @JsonCreator
    public TagResponseDto(String name) {
        this.name = name;
    }

    public TagResponseDto(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }
}
