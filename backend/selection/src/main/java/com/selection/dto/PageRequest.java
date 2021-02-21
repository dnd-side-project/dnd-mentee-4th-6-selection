package com.selection.dto;

import org.springframework.data.domain.Sort.Direction;

public class PageRequest {

    private final int page;
    private final int size;
    private final Direction direction;

    public PageRequest(int page, int size, Direction direction) {
        this.page = page;
        this.size = size;
        this.direction = direction;
    }

    public org.springframework.data.domain.PageRequest of() {
        return org.springframework.data.domain.PageRequest
            .of(this.page - 1, this.size, this.direction, "createdAt");
    }
}
