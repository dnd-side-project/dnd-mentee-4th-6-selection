package com.selection.dto.notice;

import lombok.Builder;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public class PageRequest {

    private final int DEFAULT_SIZE = 10;
    private final int MAX_SIZE = 50;
    private int page;
    private int size;
    private Sort.Direction direction;

    public PageRequest(int page, int size, Direction direction) {
        this.page = page;
        this.size = size;
        this.direction = direction;
    }

    public void setPage(int page) {
        this.page = page <= 0 ? 1 : page;
    }

    public void setSize(int size) {
        this.size = size > MAX_SIZE ? DEFAULT_SIZE : size;
    }

    public void setDirection(Sort.Direction direction) {
        this.direction = direction;
    }

    public org.springframework.data.domain.PageRequest of() {
        return org.springframework.data.domain.PageRequest
            .of(this.page - 1, this.size, this.direction, "createdAt");
    }
}
