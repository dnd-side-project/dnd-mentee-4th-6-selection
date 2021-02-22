package com.selection.domain.article;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class VoteTest {

    @Test
    @DisplayName("투표 도메인 테스트")
    public void createVote() {
        // given
        final String userIdOfVoter = "애플";
        final String choiceContent = "선택지 1";

        Choice chocie = new Choice(choiceContent, null);
        Vote vote = new Vote(userIdOfVoter, chocie);

        assertThat(vote.getUserId()).isEqualTo(userIdOfVoter);
        assertThat(vote.getChoice()).isEqualTo(chocie);
    }

}