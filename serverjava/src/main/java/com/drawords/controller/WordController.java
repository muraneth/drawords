package com.drawords.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.drawords.Service.WordService;
import com.drawords.bean.MuxResponse;
import com.drawords.bean.PageQuery;
import com.drawords.bean.WordView;
import com.drawords.bean.WordTranslation;
import com.drawords.bean.user.User;
import com.drawords.exception.UnauthorizedException;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class WordController extends BaseController {

    @Autowired
    private WordService wordService;

    @PostMapping("/saveWord")
    public MuxResponse<String> SaveWord(HttpServletRequest request, @RequestBody(required = true) WordView wordView) {

        // try {
        // super.authorizeRequest(request);
        // } catch (UnauthorizedException e) {
        // return MuxResponse.buildErrorResponse(e.getMessage());
        // }

        wordService.saveWord(wordView);
        return MuxResponse.buildSuccessResponse(null);
    }

    @PostMapping("/checkWord")
    public MuxResponse<WordTranslation> checkWord(HttpServletRequest request, @RequestBody WordView wordView) {
        // try {
        // super.authorizeRequest(request);
        // } catch (UnauthorizedException e) {
        // return MuxResponse.buildErrorResponse(e.getMessage());
        // }

        WordTranslation queryWord = wordService.checkWord(wordView);

        return MuxResponse.buildSuccessResponse(queryWord);
    }

}
