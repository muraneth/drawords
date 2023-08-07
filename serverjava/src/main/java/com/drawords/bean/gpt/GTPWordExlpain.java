package com.drawords.bean.gpt;

import java.util.List;

import com.alibaba.fastjson.JSONObject;

import lombok.Data;

@Data
public class GTPWordExlpain {
    private String word;
    private String phonetic;
    private JSONObject translations;
    private String picPrompt;
    private List<String> similarWords;
}
