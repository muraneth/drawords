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

    // write a function with name getUserById and return a mock
    // com.drawords.bean.user.User object , put some value into the user object
    // public com.drawords.bean.user.User getUserById(int id) {
    // com.drawords.bean.user.User user = new com.drawords.bean.user.User();
    // user.setId(id);
    // user.setUsername("username");
    // user.setPassword("password");
    // return user;

}
