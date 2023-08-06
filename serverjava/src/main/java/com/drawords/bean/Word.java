package com.drawords.bean;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Word {

    private String word;
    private String explaination;
    private String phonetic_us;
    private String phonetic_en;
    private String pic_url;
    private List<String> sample_sentences;
    private List<String> similar_words;

}
