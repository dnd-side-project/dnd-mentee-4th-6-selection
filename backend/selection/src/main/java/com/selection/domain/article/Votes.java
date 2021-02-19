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

    protected void delete(String author) {
        votes.removeIf(vote -> vote.getAuthor().equals(author));
    }

    public boolean existByAuthor(String author) {
        return votes.stream().anyMatch(vote -> vote.getAuthor().equals(author));
    }
}
