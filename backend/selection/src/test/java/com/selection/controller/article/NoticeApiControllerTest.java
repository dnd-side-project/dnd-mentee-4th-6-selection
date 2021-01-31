package com.selection.controller.article;

import com.selection.config.SecurityConfig;
import com.selection.domain.notice.Notice;
import com.selection.repository.NoticeReposiotry;
import com.selection.security.AuthSuccessHandler;
import com.selection.security.JwtTokenDecoder;
import com.selection.service.UserAuthService;
import com.selection.service.notice.NoticeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
            .andExpect(content().string(containsString("공지사항을 성공적으로 조회하였습니다.")));
    }
}