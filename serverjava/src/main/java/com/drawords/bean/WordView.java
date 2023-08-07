package com.drawords.bean;

import com.drawords.bean.user.User;

import lombok.Data;

@Data
public class WordView {

    private String word;

    private WordContext context;

}
