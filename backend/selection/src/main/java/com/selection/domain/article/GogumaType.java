package com.selection.domain.article;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GogumaType {
    VERYHAPPY("VERYHAPPY"),
    RELAX("RELAX"),
    SURPRISED("SURPRISED"),
    GOGUMA("GOGUMA"),
    SAD("SAD"),
    ANGRY("ANGRY"),
    GOOD("GOOD");
    private final String value;

    @JsonCreator
    public void setGogumaType(String value) {
        System.out.println(value);
    }
}
