package com.selection.domain.article;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GogumaType {
    HAPPY("HAPPY"), ANGRY("ANGRY"), CONFUSED("CONFUSED");

    private final String value;
}
