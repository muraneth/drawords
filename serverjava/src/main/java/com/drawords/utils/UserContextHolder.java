package com.drawords.utils;

import com.drawords.bean.user.UserContext;

public class UserContextHolder {
    private static final ThreadLocal<UserContext> userContext = new ThreadLocal<>();

    public static UserContext getContext() {
        return userContext.get();
    }

    public static void setContext(UserContext context) {
        userContext.set(context);
    }
}
