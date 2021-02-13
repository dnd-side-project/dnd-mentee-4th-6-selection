package com.selection.dto.tag;

import com.selection.domain.article.Article;
import com.selection.domain.tag.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;

@Getter
@NoArgsConstructor
public class TagRequest {

    private Long id;
    private String content = Strings.EMPTY;

    @Builder
    public TagRequest(String content) {
        this.content = content;
    }

    public Tag toEntity(Article article) {
        return Tag.builder()
            .content(content)
            .article(article)
            .build();
    }
}
