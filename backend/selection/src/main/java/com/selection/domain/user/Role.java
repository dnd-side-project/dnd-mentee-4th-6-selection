package com.selection.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST(ROLES.ADMIN, "관리자"),
    USER(ROLES.USER, "일반 사용자");

    private final String authority;
    private final String description;

    public static class ROLES {

        public static final String ADMIN = "ROLE_ADMIN";
        public static final String USER = "ROLE_USER";
    }
}
