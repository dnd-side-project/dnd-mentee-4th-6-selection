package com.selection.dto.question;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestionModifyRequest {

    private Long id;
    private String description;
}
