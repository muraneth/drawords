package com.drawords.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.drawords.bean.PageQuery;
import com.drawords.bean.WordView;
import com.drawords.bean.WordDetail;
import com.google.common.collect.Lists;

import db3_database_v2_proto.Db3DatabaseV2.Document;
import java.util.logging.*;

@Service
public class WordService {
    private static final Logger logger = Logger.getLogger(WordService.class.getName());

    private WordDetail word = new WordDetail("decentralized", "n. 去中心化", "[diːˈsɛntrəˌlaɪzd]", "",
            "https://cdn.ejoy.io/ej/def/50331.jpg",
            Lists.newArrayList(
                    " A network of interconnected nodes, each having its own decision-making power and contributing to the overall functioning of the system."),
            Lists.newArrayList("recover", "reclaim"));
    private DB3Client db3Client = DB3Client.getInstance();

    public void saveWord(WordView saveWord) {

        db3Client.saveToDB3(word);
    }

    public WordDetail queryWord(WordView wordView) {

        return this.word;
    }

    public List<WordDetail> queryWordList(PageQuery query) {

        List<Document> queryDoc = db3Client.queryDoc(query.getQuery_key());

        return queryDoc.stream().map(item -> {

            WordDetail w = JSON.parseObject(item.getDoc(), WordDetail.class);

            return w;
        }).collect(Collectors.toList());

    }
}
