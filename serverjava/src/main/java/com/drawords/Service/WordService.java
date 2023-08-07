package com.drawords.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.drawords.Service.translate.GPTClient;
import com.drawords.bean.PageQuery;
import com.drawords.bean.WordContext;
import com.drawords.bean.WordView;
import com.drawords.bean.gpt.GTPWordExlpain;
import com.drawords.bean.user.UserContext;
import com.drawords.utils.UserContextHolder;
import com.drawords.bean.WordTranslation;
import com.google.common.collect.Lists;

import db3_database_v2_proto.Db3DatabaseV2.Document;
import java.util.logging.*;

@Service
public class WordService {
    private static final Logger logger = Logger.getLogger(WordService.class.getName());

    private DB3Client db3Client = DB3Client.getInstance();

    public void saveWord(WordView saveWord) {

        UserContext userContext = UserContextHolder.getContext();

        WordTranslation word = new WordTranslation();

        db3Client.saveToDB3(word);
    }

    public WordTranslation checkWord(WordView wordView) {
        WordContext context = wordView.getContext();
        GTPWordExlpain askGPTAsDictionary = GPTClient.askGPTAsDictionary(wordView.getWord(), context.getSentence(),
                false, "CN");

        WordTranslation translation = new WordTranslation();
        translation.setWord(askGPTAsDictionary.getWord());
        // translation.setTranslations(askGPTAsDictionary.getTranslations());
        translation.setPhoneticUS(askGPTAsDictionary.getPhonetic());
        translation.setSimilarWords(askGPTAsDictionary.getSimilarWords());
        return translation;
    }

    public List<WordTranslation> queryWordList(PageQuery query) {

        List<Document> queryDoc = db3Client.queryDoc(query.getQuery_key());

        return queryDoc.stream().map(item -> {

            WordTranslation w = JSON.parseObject(item.getDoc(), WordTranslation.class);

            return w;
        }).collect(Collectors.toList());

    }
}
