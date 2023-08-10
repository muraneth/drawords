package com.drawords.Service.translate;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.junit.Assert;

@SpringBootTest

public class GoogleTranslateTest {

    @Test
    public void testTranslateSentenceWithValidInput() {
        String sourceText = "Hello";
        String sourceLanguage = "en";
        String targetLanguage = "es";

        String translatedText = GoogleTranslate.translateSentence(sourceText, sourceLanguage, targetLanguage);

        Assert.assertEquals("Hola", translatedText);
    }

    @Test
    public void testTranslateSentenceWithNullSourceText() {
        String sourceText = null;
        String sourceLanguage = "en";
        String targetLanguage = "fr";

        String translatedText = GoogleTranslate.translateSentence(sourceText, sourceLanguage, targetLanguage);

        Assert.assertEquals("Source text is null.", translatedText);
    }

}
