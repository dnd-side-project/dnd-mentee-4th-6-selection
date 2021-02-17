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

    protected Goguma findById(Long gogumaId) {
        return gogumas.stream()
            .filter(goguma -> goguma.getId().equals(gogumaId))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException(
                String.format("해당 고구마(%s)는 존재하지 않습니다.", gogumaId)));
    }

    protected void add(Goguma goguma) {
        this.gogumas.add(goguma);
    }

    protected void delete(Long gogumaId) {
        boolean deleted = gogumas.removeIf(originGoguma -> originGoguma.getId().equals(gogumaId));
        if (!deleted) {
            throw new IllegalArgumentException(String.format("해당 고구마(%s)는 존재하지 않습니다.", gogumaId));
        }
    }

    protected void modify(Long gogumaId, GogumaRequest gogumaRequest) {
        Goguma goguma = findById(gogumaId);
        goguma.modifyType(gogumaRequest.getType());
        goguma.modifyMessage(gogumaRequest.getMessage());
    }
}
