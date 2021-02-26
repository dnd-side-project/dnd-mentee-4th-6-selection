package com.selection.domain.user;

import com.selection.domain.BaseEntity;
import com.selection.security.oauth.AuthProvider;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "userId")
})
@Getter
public class User extends BaseEntity {

    @Email
    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String nickname = Strings.EMPTY;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder
    public User(@Email String userId, String nickname,
        @NotNull AuthProvider provider, Role role) {
        this.userId = userId;
        this.nickname = nickname;
        this.provider = provider;
        this.role = role;
    }

    public String getRoleAuthority() {
        return this.role.getAuthority();
    }

    public User update(String nickname) {
        this.nickname = nickname;
        return this;
    }

    public void modifyNickname(String nickname) {
        this.nickname = nickname;
    }
}
