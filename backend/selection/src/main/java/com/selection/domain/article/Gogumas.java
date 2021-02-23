package com.selection.domain.article;

import com.selection.advice.exception.GogumaAccessException;
import com.selection.advice.exception.GogumaNotFoundException;
import com.selection.dto.goguma.GogumaRequest;
import java.util.ArrayList;
import java.util.List;
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
            .orElseThrow(() -> new GogumaNotFoundException(
                String.format("해당 고구마(%s)는 존재하지 않습니다.", gogumaId)
            ));
    }

    protected void add(Goguma goguma) {
        this.gogumas.add(goguma);
    }

    private void validationExist(Goguma goguma, Long gogumaId) {
        if (!goguma.getId().equals(gogumaId)) {
            throw new GogumaNotFoundException(
                String.format("해당 고구마(%s)는 존재하지 않습니다.", gogumaId)
            );
        }
    }

    protected void validationAccess(Goguma goguma, String userId) {
        if (!goguma.getUserId().equals(userId)) {
            throw new GogumaAccessException(
                String.format("해당 유저(%s)는 고구마(%d)에 접근 권한이 없습니다.", userId, goguma.getId())
            );
        }
    }

    protected void delete(Long gogumaId, String userId) {
        gogumas.removeIf(originGoguma -> {
            validationExist(originGoguma, gogumaId);
            validationAccess(originGoguma, userId);
            return originGoguma.getId().equals(gogumaId) && originGoguma.getUserId().equals(userId);
        });
    }

    protected void modify(Long gogumaId, String userId, GogumaRequest gogumaRequest) {
        Goguma goguma = findById(gogumaId);
        if (goguma.getUserId().equals(userId)) {
            throw new GogumaAccessException(
                String.format("해당 유저(%s)는 고구마(%d)에 접근 권한이 없습니다.", userId, gogumaId)
            );
        }
        goguma.modifyGogumaType(gogumaRequest.getGogumaType());
        goguma.modifyMessage(gogumaRequest.getMessage());
    }
}
