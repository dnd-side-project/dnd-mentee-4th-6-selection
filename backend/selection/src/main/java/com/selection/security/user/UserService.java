package com.selection.security.user;

import com.selection.domain.user.User;
import com.selection.dto.MyInfoResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public MyInfoResponse findMyInfo() {
        User user = (User) SecurityContextHolder.getContext()
            .getAuthentication()
            .getPrincipal();

        return new MyInfoResponse(user.getName());
    }
}
