package com.selection.domain.tag;

import com.selection.dto.tag.TagResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Embeddable
public class Tags {

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();

    public Tags(List<Tag> tags) {
        this.tags = tags;
    }

    public void add(Tag tag) {
        this.tags.add(tag);
    }

    public void addAll(List<Tag> tags) {
        this.tags.addAll(tags);
    }

    public void modifyTagName(Long id, String name) {
        for (Tag tag : tags) {
            if (tag.getId().equals(id)) {
                tag.modifyName(name);
            }
        }
    }

    public List<TagResponse> toResponses() {
        return tags.stream().map((TagResponse::new)).collect(Collectors.toList());
    }

}
