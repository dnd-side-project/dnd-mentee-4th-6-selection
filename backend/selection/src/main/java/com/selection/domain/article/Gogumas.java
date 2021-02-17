package com.selection.domain.article;

import com.selection.dto.goguma.GogumaRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class Gogumas {

    @OneToMany(mappedBy = "article", orphanRemoval = true, cascade = CascadeType.ALL)
    private final List<Goguma> gogumas = new ArrayList<>();

    protected int size() {
        return gogumas.size();
    }

    protected Optional<Goguma> get(Long gogumaId) {
        return gogumas.stream()
            .filter(goguma -> goguma.getId().equals(gogumaId))
            .findFirst();
    }

    protected void add(Goguma goguma) {
        this.gogumas.add(goguma);
    }

    protected void delete(Goguma goguma) {
        gogumas.removeIf(originGoguma -> originGoguma.getId().equals(goguma.getId()));
    }

    protected void modify(Article article, GogumaRequest goguma) {
        Optional<Goguma> findGoguma = get(goguma.getId());

        if (findGoguma.isPresent()) {
            Goguma originGoguma = findGoguma.get();
            originGoguma.modifyType(goguma.getType());
            originGoguma.modifyMessage(goguma.getMessage());
        } else {
            gogumas.add(goguma.toEntity(article));
        }
    }
}
