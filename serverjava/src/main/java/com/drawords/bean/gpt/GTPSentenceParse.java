package com.drawords.bean.gpt;

import java.util.List;

import lombok.Data;

@Data
public class GTPSentenceParse {
    private String sentence;
    private List<String> extract_words;
}
