package com.drawords.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.drawords.Service.WordService;
import com.drawords.bean.MuxResponse;
import com.drawords.bean.PageQuery;
import com.drawords.bean.SaveWord;
import com.drawords.bean.User;
import com.drawords.bean.Word;

@RestController
public class WordController {

    @Autowired
    private WordService wordService;

    @PostMapping("/saveWord")
    public Object SaveWord(SaveWord word) {

        return null;
    }

    @PostMapping("/wordList")
    public Object WordList(@RequestParam(required = true) int count) {

        PageQuery query = new PageQuery();

        return wordService.queryWordList(query);

    }

    @PostMapping("/checkWord")
    public Word checkWord(@RequestParam(required = true) String word, User user) {

        return wordService.queryWord(word);
    }

}
