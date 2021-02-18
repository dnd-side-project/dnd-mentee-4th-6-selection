package com.selection.security.user;

import com.selection.domain.article.Article;
import com.selection.domain.user.User;
import com.selection.dto.MyInfoResponse;
import com.selection.dto.PageRequest;
import com.selection.dto.article.ArticleResponse;
import com.selection.repository.ArticleRepository;
import com.selection.repository.UserRepository;
import com.selection.security.UserPrincipal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public MyInfoResponse findMyInfo() {
        User me = findMe();

        return new MyInfoResponse(me.getName());
    }

    /* 이거 인풋 어케받아야하는지? */
    public List<ArticleResponse> findMyArticles(PageRequest pageRequest) {
        User me = findMe();

        Page<Article> myArticles = articleRepository.findAllById(pageRequest.of(), me.getId());

        return myArticles.stream()
            .map(ArticleResponse::new)
            .collect(Collectors.toList());
    }

    private User findMe() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
            .getAuthentication()
            .getPrincipal();

        Long id = userPrincipal.getId();
        return userRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException(id + "는 존재하지 않는 사용자 ID임"));
    }
}
