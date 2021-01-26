package com.selection.domain.tag;

import com.selection.domain.article.Article;
import com.selection.repository.ArticleRepository;
import com.selection.repository.TagRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TagTest {

    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private TagRepository tagRepository;

    @Test
    @DisplayName("태그 등록 테스트")
    public void createTag() {
        // given
        String articleTitle = "설문지1";
        String articleContent = "질문 내용";
        String tagName = "테스트 태그";

        Article article = Article.builder().title(articleTitle).content(articleContent).build();
        Tag tag = Tag.builder().name(tagName).article(article).build();
        article.addTags(tag);

        articleRepository.save(article);

        //when
        Tag loadTag = tagRepository.findAll().get(0);

        // then
        assertThat(loadTag.getName()).isEqualTo(tagName);
        assertThat(loadTag.getArticle().getTitle()).isEqualTo(articleTitle);
    }
}