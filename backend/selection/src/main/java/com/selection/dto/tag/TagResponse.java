package com.selection.dto.tag;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.selection.domain.tag.Tag;
import lombok.Getter;

@Getter
public class TagResponse {

    private final Long id;
    private final String content;

    public TagResponse(Tag tag) {
        this.id = tag.getId();
        this.content = tag.getContent();
    }
}
