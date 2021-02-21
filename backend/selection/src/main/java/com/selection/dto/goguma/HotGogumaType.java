package com.selection.dto.goguma;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum HotGogumaType {
    DRAFTGUMA("DRAFTGUMA"), FIREGOUMA("FIREGUMA"), HONORGUMA("HONORGUMA");

    private final String title;
}
