package com.selection.domain.article;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GogumaType {
    VERYHAPPY("VERYHAPPY"),
    RELAX("RELAX"),
    SUPRISED("SUPRISED"),
    GOGUMA("GOGUMA"),
    SAD("SAD"),
    ANGRY("ANGRY"),
    GOOD("GOOD");
    private final String value;
}
