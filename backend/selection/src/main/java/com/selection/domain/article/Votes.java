package com.selection.domain.article;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class Votes {

    @OneToMany(mappedBy = "choice", orphanRemoval = true, cascade = CascadeType.ALL)
    private final List<Vote> votes = new ArrayList<>();

    protected void add(Vote vote) {
        votes.add(vote);
    }

    protected void delete(Long voteId) {
        boolean deleted = votes.removeIf(vote -> vote.getId().equals(voteId));
        if (!deleted) {
            throw new IllegalArgumentException(String.format("해당 투표는(%s)는 존재하지 않습니다.", voteId));
        }
    }
}
