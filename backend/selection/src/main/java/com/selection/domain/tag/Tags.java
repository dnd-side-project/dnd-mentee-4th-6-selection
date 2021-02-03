package com.selection.domain.tag;

import com.selection.dto.tag.TagResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class Tags {

    @OneToMany(mappedBy = "article", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Tag> tags = new HashSet<>();

    public Tags(List<Tag> tags) {
        this.tags = new HashSet<>(tags);
    }

    public void add(Tag tag) {
        this.tags.add(tag);
    }

    public void addAll(List<Tag> tags) {
        this.tags.addAll(tags);
    }

    public List<TagResponse> toResponses() {
        return tags.stream().map((TagResponse::new)).collect(Collectors.toList());
    }

}
