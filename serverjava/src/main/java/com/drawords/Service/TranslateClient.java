package com.drawords.Service;

import com.drawords.Service.translate.GoogleTranslate;
import com.drawords.bean.WordTranslation;

public class TranslateClient {

    public static WordTranslation translation(String word) {

        String translateSentence = GoogleTranslate.translateSentence(word, "", "");
        WordTranslation wordTranslation = new WordTranslation();
        wordTranslation.setWord(word);
        wordTranslation.setTranslation(translateSentence);

        return null;

    }
}
