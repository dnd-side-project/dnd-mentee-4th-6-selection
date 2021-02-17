package com.selection.domain.tag;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.selection.domain.article.Article;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TagTest {

    @Test
    @DisplayName("태그 등록 테스트")
    public void createTag() {
        // given
        final String title = "게시글 1";
        final String content = "게시글 내용";
        final String author = "애플";
        final String tagContent = "테스트 태그";

        Article article = Article.builder()
            .title(title)
            .content(content)
            .author(author)
            .build();

        Tag tag1 = Tag.builder()
            .content(tagContent)
            .article(article)
            .build();

        assertThat(tag1.getContent()).isEqualTo(tagContent);
    }
}