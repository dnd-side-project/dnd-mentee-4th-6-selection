package com.selection.domain.user;

import com.selection.advice.exception.UserNotFoundException;
import com.selection.security.oauth.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userId) {
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new UserNotFoundException(
                    String.format("해당 이메일(%s)는 존재하지 하는 유저 이메일입니다.", userId)
                )
            );
        return UserPrincipal.create(user);
    }
}