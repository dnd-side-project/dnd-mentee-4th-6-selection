package com.selection.domain.tag;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.selection.domain.article.Article;
import com.selection.repository.ArticleRepository;
import com.selection.repository.TagRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
    final String title = "게시글 1";
    final String content = "게시글 내용";
    final String author = "애플";
    final String tagName = "테스트 태그";

    Article article = Article.builder()
        .title(title)
        .content(content)
        .author(author)
        .build();

    Tag tag1 = Tag.builder()
        .name(tagName)
        .article(article)
        .build();

    article.getTags().add(tag1);
    articleRepository.save(article);

    //when
    Tag loadTag = tagRepository.findAll().get(0);

    // then
    assertThat(loadTag.getName()).isEqualTo(tagName);
    assertThat(loadTag.getArticle().getTitle()).isEqualTo(title);
  }

  @AfterEach
  public void cleanUp() {
    articleRepository.deleteAll();
  }

}