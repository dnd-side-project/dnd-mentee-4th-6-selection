package com.selection.service.user;

import com.selection.domain.user.User;
import com.selection.dto.MyInfoResponse;
import com.selection.repository.UserRepository;
import com.selection.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    // private final ArticleRepository articleRepository;

    public MyInfoResponse findMyInfo() {
        User me = findMe();

        return new MyInfoResponse(me.getName());
    }

    /* 이거 인풋 어케받아야하는지? */
    /* 프론트랑 상의 후 작성 일단 보류 */
/*    public List<ArticleResponse> findMyArticles(PageRequest pageRequest) {
        User me = findMe();

        Page<Article> myArticles = articleRepository.findAllById(pageRequest.of(), me.getId());

        return myArticles.stream()
            .map(article -> new ArticleResponse())
            .collect(Collectors.toList());
    }*/

    private User findMe() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
            .getAuthentication()
            .getPrincipal();

        Long id = userPrincipal.getId();
        return userRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException(id + "는 존재하지 않는 사용자 ID임"));
    }
}
