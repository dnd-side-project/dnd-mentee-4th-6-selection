package com.selection.controller.article;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.selection.domain.notice.Notice;
import com.selection.repository.NoticeReposiotry;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

@AutoConfigureMockMvc
@SpringBootTest
class NoticeApiControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext ctx;

    @Autowired
    private NoticeReposiotry noticeReposiotry;

    @BeforeEach
    @DisplayName("테스트 목업 준비")
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
            .addFilters(new CharacterEncodingFilter("UTF-8", true))  // UTF-8 인코딩 필터 추가
            .alwaysDo(print())
            .build();

        Notice notice = Notice.builder()
            .title("공지사항 테스트")
            .content("공지사항 테스트")
            .author("관리자 1")
            .build();

        noticeReposiotry.save(notice);
    }

    @AfterEach
    @DisplayName("리소스 정리")
    public void cleanUp() {
        noticeReposiotry.deleteAll();
    }

    @Test
    @DisplayName("공지사항 페이징 테스트")
    public void getNotices() throws Exception {
        final String PAGE = "1";
        final String SIZE = "10";
        final String DIRECTION = "ASC";

        mockMvc.perform(
            get("/api/notices")
                .param("page", PAGE)
                .param("size", SIZE)
                .param("direction", DIRECTION)
        )
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString(
                "{\"id\":1,\"title\":\"공지사항 테스트\",\"author\":\"관리자 1\",\"content\":\"공지사항 테스트\",")));
    }
}