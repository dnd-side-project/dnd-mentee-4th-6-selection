package com.selection.domain.user;

import com.selection.advice.exception.UserNotFoundException;
import com.selection.dto.user.ProfileResponse;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId)
            .orElseThrow(() -> new UserNotFoundException(
                String.format("해당 이메일(%s)는 존재하지 하는 유저 이메일입니다.", userId)
            ));
    }

    @Transactional
    public String findNicknameByUserId(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        return user.isPresent() ? user.get().getNickname() : "존재하지 않는 회원입니다.";
    }

    @Transactional
    public ProfileResponse lookUpMyProfile(String userId) {
        User user = findByUserId(userId);
        return new ProfileResponse(user.getUserId(), user.getNickname(), user.getProvider());
    }

    @Transactional
    public void modifyNickName(String userId, String nickname) {
        User user = findByUserId(userId);
        user.modifyNickname(nickname);
    }
}
