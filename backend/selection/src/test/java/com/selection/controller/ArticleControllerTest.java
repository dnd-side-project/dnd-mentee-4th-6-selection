package com.selection.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.selection.domain.article.Article;
import com.selection.dto.article.ArticleRequest;
import com.selection.dto.article.ArticleResponse;
import com.selection.dto.choice.ChoiceRequest;
import com.selection.domain.article.ArticleRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

@TestMethodOrder(OrderAnnotation.class)
@AutoConfigureMockMvc
@SpringBootTest
@DisplayName("게시글 API 테스트")
class ArticleControllerTest {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext ctx;

    private MockMvc mockMvc;

    @Autowired
    private ArticleRepository articleRepository;

    @BeforeEach
    @DisplayName("목업 준비")
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
            .addFilters(new CharacterEncodingFilter("UTF-8", true))  // UTF-8 인코딩 필터 추가
            .alwaysDo(print())
            .build();
    }

    @AfterEach
    @DisplayName("Clean Up")
    public void cleanUp() {
        articleRepository.deleteAll();
    }

    public ArticleRequest createArticleRequest() {
        final String title = "제목 1";
        final String content = "내용 1";
        final String choiceContent1 = "선택지 1";
        final String choiceContent2 = "선택지 2";

        List<ChoiceRequest> choiceRequests = Arrays.asList(
            new ChoiceRequest(choiceContent1),
            new ChoiceRequest(choiceContent2)
        );

        return new ArticleRequest(title, content, choiceRequests);
    }

    public Article setUpArticle(ArticleRequest request) {
        final String author = "애플";
        return articleRepository.save(request.toEntity(author));
    }

    @Test
    @Order(1)
    @DisplayName("게시글 작성 API 테스트")
    public void createArticle() throws Exception {
        // given
        ArticleRequest requestArticle = createArticleRequest();

        // when
        MvcResult result = mockMvc.perform(post("/articles")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(requestArticle)))
            .andExpect(status().isOk())
            .andReturn();

        // then
        Long articleId = Long.valueOf(result.getResponse().getContentAsString());
        Optional<Article> article = articleRepository.findById(articleId);
        assertThat(article.isPresent()).isTrue();
        assertThat(article.get().getTitle()).isEqualTo(requestArticle.getTitle());
        assertThat(article.get().getContent()).isEqualTo(requestArticle.getContent());
    }

    @Test
    @Order(2)
    @DisplayName("게시글 수정 API 테스트")
    public void modifyArticle() throws Exception {
        // given
        final String title = "제목 2";
        final String content = "내용 2";

        ArticleRequest modifyArticle = new ArticleRequest(title, content,
            new ArrayList<>());

        Article article = setUpArticle(createArticleRequest());

        // when
        mockMvc.perform(
            put("/articles/" + article.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(modifyArticle))
        )
            .andExpect(status().isOk());

        // then
        Optional<Article> result = articleRepository.findById(article.getId());
        assertThat(result.isPresent()).isTrue();
        assertThat(result.get().getTitle()).isEqualTo(title);
        assertThat(result.get().getContent()).isEqualTo(content);
    }

    @Test
    @Order(3)
    @DisplayName("게시글 조회 API 테스트")
    public void lookUpArticle() throws Exception {
        // given
        Article article = setUpArticle(createArticleRequest());

        // when
        MvcResult result = mockMvc.perform(
            get("/articles/" + article.getId())
        )
            .andExpect(status().isOk())
            .andReturn();

        ArticleResponse articleResponse = objectMapper
            .readerFor(ArticleResponse.class).readValue(result.getResponse().getContentAsString());

        // then
        assertThat(articleResponse.getTitle()).isEqualTo(article.getTitle());
        assertThat(articleResponse.getContent()).isEqualTo(article.getContent());
    }

    @Test
    @Order(4)
    @DisplayName("게시글 삭제 API 테스트")
    public void deleteArticle() throws Exception {
        // given
        Article article = setUpArticle(createArticleRequest());

        // when
        mockMvc.perform(delete("/articles/" + article.getId()))
            .andExpect(status().isOk());

        // then
        Optional<Article> result = articleRepository.findById(article.getId());
        assertThat(result.isPresent()).isFalse();
    }

}