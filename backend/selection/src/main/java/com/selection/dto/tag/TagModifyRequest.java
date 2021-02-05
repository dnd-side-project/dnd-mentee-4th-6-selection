package com.selection.dto.tag;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TagModifyRequest {

    private Long id;
    private String name;

    public TagModifyRequest(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
