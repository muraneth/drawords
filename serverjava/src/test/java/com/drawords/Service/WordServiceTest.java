package com.drawords.Service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.drawords.bean.WordContext;
import com.drawords.bean.WordView;

@SpringBootTest

public class WordServiceTest {
    @Autowired
    private WordService wordService;

    @Test
    void testCheckWord() {
        WordView wordView = new WordView();
        wordView.setWord("export");
        wordView.setContext(new WordContext());

    }

    @Test
    void testQueryWordList() {

    }

    @Test
    void testSaveWord() {

    }
}
