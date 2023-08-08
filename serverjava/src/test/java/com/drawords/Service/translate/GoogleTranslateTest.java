package com.drawords.Service.translate;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GoogleTranslateTest {
    @Test
    void testTranslateSentence() {
        String s = GoogleTranslate.translateSentence("using .", null, "Zh-CN");
        System.out.println(s);
    }
}
