package com.selection.dto.tag;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.tag.Tag;
import lombok.Getter;

@Getter
public class TagResponse {

    private Long id;
    private String name;

    @JsonCreator
    public TagResponse(String name) {
        this.name = name;
    }

    public TagResponse(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }
}
