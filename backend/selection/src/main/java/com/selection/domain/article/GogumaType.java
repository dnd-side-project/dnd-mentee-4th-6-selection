package com.selection.domain.article;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GogumaType {
    HAPPY("HAPPY"), ANGRY("ANGRY"), CONFUSED("CONFUSED");

    private final String type;
}
