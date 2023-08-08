package com.drawords.controller;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.drawords.Service.WordService;
import com.drawords.bean.MuxResponse;
import com.drawords.bean.PageQuery;
import com.drawords.bean.WordQuery;

import com.drawords.bean.WordTranslation;
import com.drawords.bean.user.User;
import com.drawords.exception.UnauthorizedException;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class WordController extends BaseController {
    private static final Logger logger = Logger.getLogger(WordController.class.getName());

    @Autowired
    private WordService wordService;

    @PostMapping("/saveWord")
    public MuxResponse<String> SaveWord(HttpServletRequest request, @RequestBody(required = true) WordQuery wQuery) {

        // try {
        // super.authorizeRequest(request);
        // } catch (UnauthorizedException e) {
        // return MuxResponse.buildErrorResponse(e.getMessage());
        // }

        wordService.saveWord(wQuery);
        return MuxResponse.buildSuccessResponse(null);
    }

    @PostMapping("/checkWord")
    public MuxResponse<WordTranslation> checkWord(HttpServletRequest request, @RequestBody WordQuery wQuery) {
        // try {
        // super.authorizeRequest(request);
        // } catch (UnauthorizedException e) {
        // return MuxResponse.buildErrorResponse(e.getMessage());
        // }

        WordTranslation queryWord = wordService.checkWord(wQuery);

        return MuxResponse.buildSuccessResponse(queryWord);
    }

    @PostMapping("/translate")
    public MuxResponse<WordTranslation> translateWord(HttpServletRequest request, @RequestBody WordQuery wQuery) {
        // try {
        // super.authorizeRequest(request);
        // } catch (UnauthorizedException e) {
        // return MuxResponse.buildErrorResponse(e.getMessage());
        // }
        long t1 = System.currentTimeMillis();
        logger.info(JSON.toJSONString(wQuery));
        WordTranslation queryWord = wordService.translateWord(wQuery);
        logger.info("" + (System.currentTimeMillis() - t1));

        return MuxResponse.buildSuccessResponse(queryWord);
    }

}
