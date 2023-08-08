package com.drawords.Service.translate;

import java.util.logging.Logger;

import com.alibaba.fastjson.JSON;
import com.drawords.Service.WordService;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

import io.micrometer.common.util.StringUtils;

public class GoogleTranslate {
    private static final Logger logger = Logger.getLogger(GoogleTranslate.class.getName());

    private static final String API_KEY = "AIzaSyAjRXp4HkCMT9yHTNo3gfKf0sg5f485Vtg";

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
            logger.info(JSON.toJSONString(translation));
            return translation.getTranslatedText();
        } catch (Exception e) {
            return "Translation failed.";
        }

    }

}
