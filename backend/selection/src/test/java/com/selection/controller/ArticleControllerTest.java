package com.selection.controller;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.selection.dto.article.ArticleModifyRequest;
import com.selection.dto.article.ArticleSaveRequest;
import com.selection.dto.question.QuestionModifyRequest;
import com.selection.dto.question.QuestionSaveRequest;
import com.selection.dto.tag.TagModifyRequest;
import com.selection.dto.tag.TagSaveRequest;
import java.util.ArrayList;
import java.util.List;
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

    @BeforeEach
    @DisplayName("테스트 목업 준비")
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
            .addFilters(new CharacterEncodingFilter("UTF-8", true))  // UTF-8 인코딩 필터 추가
            .alwaysDo(print())
            .build();
    }

    @Test
    @Order(1)
    @DisplayName("게시글 작성 API 테스트")
    public void createArticle() throws Exception {
        // given
        final String title = "제목 1";
        final String content = "내용 1";
        final String backgroundColor = "#FFFFFF";
        final String description1 = "선택지 1";
        final String description2 = "선택지 2";
        final String tag1 = "태그 1";
        final String tag2 = "태그 2";

        List<QuestionSaveRequest> questions = new ArrayList<>();
        questions.add(new QuestionSaveRequest(description1));
        questions.add(new QuestionSaveRequest(description2));

        List<TagSaveRequest> tags = new ArrayList<>();
        tags.add(new TagSaveRequest(tag1));
        tags.add(new TagSaveRequest(tag2));

        ArticleSaveRequest createArticle = ArticleSaveRequest.builder()
            .title(title)
            .content(content)
            .backgroundColor(backgroundColor)
            .questions(questions)
            .tags(tags)
            .build();

        mockMvc.perform(post("/articles")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(createArticle)))
            .andExpect(status().isOk())
            .andExpect(content().string("1"))
            .andDo(print());
    }

    @Test
    @Order(2)
    @DisplayName("게시글 수정 API 테스트")
    public void modifyArticle() throws Exception {
        // given
        final String title = "제목 2";
        final String content = "내용 2";
        final String backgroundColor = "#FFEFFF";
        final String description1 = "선택지 1";
        final String description2 = "선택지 2";
        final String tag1 = "태그 1";
        final String tag2 = "태그 2";

        List<QuestionModifyRequest> questions = new ArrayList<>();
        questions.add(new QuestionModifyRequest(1L, description1));
        questions.add(new QuestionModifyRequest(1L, description2));

        List<TagModifyRequest> tags = new ArrayList<>();
        tags.add(new TagModifyRequest(1L, tag1));
        tags.add(new TagModifyRequest(1L, tag1));

        ArticleModifyRequest modifyArticle = ArticleModifyRequest.builder()
            .title(title)
            .content(content)
            .backgroundColor(backgroundColor)
            .questions(questions)
            .tags(tags)
            .build();

        mockMvc.perform(
            put("/articles/1")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(modifyArticle))
        )
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString(
                "{\"id\":1,\"title\":\"제목 2\",\"content\":\"내용 2\"")));
    }

    @Test
    @Order(3)
    @DisplayName("게시글 조회 API 테스트")
    public void lookUpArticle() throws Exception {
        mockMvc.perform(
            get("/articles/1")
        )
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString(
                "{\"id\":1,\"title\":\"제목 2\",\"content\":\"내용 2\"")));
    }

    @Test
    @Order(4)
    @DisplayName("게시글 삭제 API 테스트")
    public void deleteArticle() throws Exception {
        mockMvc.perform(delete("/articles/1")
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().string("1"))
            .andDo(print());
    }
}