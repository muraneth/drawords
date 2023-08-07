package com.drawords.Service.translate;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

import io.micrometer.common.util.StringUtils;

public class GoogleTranslate {

    private static final String API_KEY = "";

    private static Translate translate = TranslateOptions.newBuilder()
            .setApiKey(API_KEY).build()
            .getService();

    public static String translateSentence(String sourceText, String sourceLanguage, String targetLanguage) {
        sourceLanguage = StringUtils.isBlank(sourceLanguage) ? "en" : sourceLanguage;
        targetLanguage = StringUtils.isBlank(targetLanguage) ? "zh" : targetLanguage;

        try {
            Translation translation = translate.translate(sourceText,
                    Translate.TranslateOption.sourceLanguage(sourceLanguage),
                    Translate.TranslateOption.targetLanguage(targetLanguage));
            return translation.getTranslatedText();
        } catch (Exception e) {

            return "Translation failed.";
        }

    }

}
