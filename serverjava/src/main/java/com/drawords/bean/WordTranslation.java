package com.drawords.bean;

import java.util.List;

import com.alibaba.fastjson.JSONObject;

import lombok.Data;

@Data
public class WordTranslation {

    private String word;
    private String translation;
    private String phoneticUS;
    private String phoneticEN;
    private String picUrl;
    private List<String> sampleSentences;
    private List<String> similarWords;

}
