package com.drawords.Service;

import org.springframework.stereotype.Service;

import com.drawords.bean.user.User;

@Service
public class UserService {

    public User getUserById(Long id) {
        // return a mock User obejct, put some value into the user object
        User user = new User();
        user.setId(id);
        user.setName("username");
        user.setSign("password");
        return user;
    }
}
