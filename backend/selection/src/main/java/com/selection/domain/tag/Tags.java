package com.selection.domain.tag;

import com.google.common.collect.Sets;
import com.selection.domain.BaseEntity;
import com.selection.domain.article.Article;
import com.selection.dto.tag.TagRequest;
import com.selection.dto.tag.TagResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class Tags {

    @OneToMany(mappedBy = "article", orphanRemoval = true, cascade = CascadeType.ALL)
    private final List<Tag> tags = new ArrayList<>();

    public int size() {
        return tags.size();
    }

    public Tag get(int index) {
        return tags.get(index);
    }

    public void add(Tag tag) {
        this.tags.add(tag);
    }

    public void addAll(List<Tag> tags) {
        this.tags.addAll(tags);
    }

    private void delete(Long id) {
        tags.removeIf(tag -> tag.getId().equals(id));
    }

    private void modifyContent(Long id, String content) {
        tags.stream()
            .filter(tag -> tag.getId().equals(id))
            .forEach(updateTag -> updateTag.modifyContent(content));
    }

    public void modify(Article article, List<TagRequest> requestTags) {
        Set<Long> tagIds = tags.stream()
            .map(BaseEntity::getId)
            .collect(Collectors.toSet());

        Set<Long> modifyTagIds = requestTags.stream()
            .map(TagRequest::getId)
            .collect(Collectors.toSet());

        // 삭제
        Sets.difference(tagIds, modifyTagIds).forEach(this::delete);

        // 수정
        requestTags.stream()
            .filter(requestTag -> tagIds.contains(requestTag.getId()))
            .forEach(updateTag -> modifyContent(updateTag.getId(), updateTag.getContent()));

        // 추가
        requestTags.stream()
            .filter(requestTag -> !tagIds.contains(requestTag.getId()))
            .map(newTag -> newTag.toEntity(article))
            .forEach(this::add);
    }

    public List<TagResponse> toResponses() {
        return tags.stream()
            .map(TagResponse::new).collect(Collectors.toList());
    }
}
