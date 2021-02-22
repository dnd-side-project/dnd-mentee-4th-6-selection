package com.selection.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.selection.domain.article.Article;
import com.selection.domain.article.Goguma;
import com.selection.domain.article.GogumaType;
import com.selection.dto.article.ArticleRequest;
import com.selection.dto.goguma.GogumaRequest;
import com.selection.dto.goguma.GogumaResponse;
import com.selection.dto.choice.ChoiceRequest;
import com.selection.domain.article.ArticleRepository;
import com.selection.domain.article.GogumaRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.apache.logging.log4j.util.Strings;
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
@DisplayName("고구마 API 테스트")
class GogumaControllerTest {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext ctx;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private GogumaRepository gogumaRepository;


    private MockMvc mockMvc;

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

    public GogumaRequest createGogumaRequest() {
        final GogumaType type = GogumaType.HAPPY;
        final String message = Strings.EMPTY;
        return new GogumaRequest(type, message);
    }

    public Goguma setUpGoguma(Article article, GogumaRequest gogumaRequest) {
        final String userId = "dnd-4th-6team@gmail.com";
        return gogumaRepository.save(gogumaRequest.toEntity(userId, article));
    }

/*
    @Test
    @Order(1)
    @DisplayName("고구마 등록 API 테스트")
    public void createGoguma() throws Exception {
        // given
        Article article = setUpArticle(createArticleRequest());
        GogumaRequest gogumaRequest = createGogumaRequest();
        final String postUri = String.format("/articles/%s/gogumas", article.getId());

        // when
        MvcResult result = mockMvc.perform(post(postUri)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(gogumaRequest))
        )
            .andExpect(status().isOk())
            .andReturn();
    }
*/

    @Test
    @Order(2)
    @DisplayName("고구마 수정 API 테스트")
    public void modifyGoguma() throws Exception {
        // given
        final GogumaType gogumaType = GogumaType.ANGRY;
        final String message = "메세지";
        GogumaRequest modifyGoguma = new GogumaRequest(gogumaType, message);

        Article article = setUpArticle(createArticleRequest());
        Goguma goguma = setUpGoguma(article, createGogumaRequest());
        article.addGoguma(goguma);

        final String putUri = String.format("/articles/%d/gogumas/%d", article.getId(), goguma.getId());

        // when
        mockMvc.perform(put(putUri)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(modifyGoguma))
        )
            .andExpect(status().isOk());

        // then
        Optional<Goguma> result = gogumaRepository.findById(goguma.getId());
        assertThat(result.isPresent()).isTrue();
        assertThat(result.get().getGogumaType()).isEqualTo(gogumaType);
        assertThat(result.get().getMessage()).isEqualTo(message);
    }

    @Test
    @Order(3)
    @DisplayName("고구마 조회 API 테스트")
    public void lookUpGoguma() throws Exception {
        // given
        Article article = setUpArticle(createArticleRequest());
        Goguma goguma = setUpGoguma(article, createGogumaRequest());
        article.addGoguma(goguma);

        final String getUri = String.format("/articles/%d/gogumas/%d", article.getId(), goguma.getId());

        // when
        MvcResult result = mockMvc.perform(
            get(getUri)
        )
            .andExpect(status().isOk())
            .andReturn();

        GogumaResponse gogumaResponse = objectMapper
            .readerFor(GogumaResponse.class).readValue(result.getResponse().getContentAsString());

        // then
        assertThat(gogumaResponse.getType()).isEqualTo(goguma.getGogumaType());
        assertThat(gogumaResponse.getMessage()).isEqualTo(goguma.getMessage());
    }

    @Test
    @Order(4)
    @DisplayName("고구마 삭제 API 테스트")
    public void deleteGoguma() throws Exception {
        // given
        Article article = setUpArticle(createArticleRequest());
        Goguma goguma = setUpGoguma(article, createGogumaRequest());
        article.addGoguma(goguma);

        final String deleteUri = String.format("/articles/%d/gogumas/%d", article.getId(), goguma.getId());

        // when
        mockMvc.perform(delete(deleteUri)
        )
            .andExpect(status().isOk());

        // then
        Optional<Goguma> result = gogumaRepository.findById(goguma.getId());
        assertThat(result.isPresent()).isFalse();
    }

}