package com.drawords.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.drawords.bean.PageQuery;
import com.drawords.bean.Word;
import com.google.common.collect.Lists;

@Service
public class WordService {

    private Word word = new Word("decentralized", "n. 去中心化", "[diːˈsɛntrəˌlaɪzd]", "",
            "https://cdn.ejoy.io/ej/def/50331.jpg",
            Lists.newArrayList(
                    " A network of interconnected nodes, each having its own decision-making power and contributing to the overall functioning of the system."),
            Lists.newArrayList("recover", "reclaim"));

    public Word queryWord(String query_key) {

        return this.word;
    }

    public List<Word> queryWordList(PageQuery query) {

        return Lists.newArrayList(this.word, this.word, this.word);
    }
}
