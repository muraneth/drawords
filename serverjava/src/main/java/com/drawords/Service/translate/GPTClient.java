package com.drawords.Service.translate;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import com.drawords.bean.gpt.GTPWordExlpain;

import java.util.logging.*;

public class GPTClient {
    private static final Logger logger = Logger.getLogger(GPTClient.class.getName());

    private static final String apiToken = "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";

    public static String downloadImg(String url) {
        try {
            URL imgUrl = new URL(url);
            HttpURLConnection httpURL = (HttpURLConnection) imgUrl.openConnection();
            httpURL.connect();
            httpURL.getInputStream();

        } catch (Exception e) {

        }
        return "";
    }

    public static String getPrompt(String word, String context, Boolean generateImg, String language) {
        String systemMessage = "";
        if (generateImg) {
            if (context != null && context.length() > 0) {
                systemMessage = String.format(
                        "translate the word '%s' based on the context: '%s', draw a picture that describe the word (pic generate prompt) . Please reply in the json as the format: {word:xx, phonetic: [xx], translation_%s: n/adj/v.xx,pic_prompt:xx,similer_words:[a,b,c] }",
                        word, context, language);
            } else {
                systemMessage = String.format(
                        "translate the word %s, additionally,draw a picture that describe the word (pic generate prompt) . Please reply in the json as the format: {word:xx, phonetic: [xx], translation_CN: n/adj/v.xx , pic_prompt:xx,similer_words:[a,b,c]}",
                        word);
            }
        } else {
            if (context != null && context.length() > 0) {
                systemMessage = String.format(
                        "translate the word '%s' into '%s' based on the context: '%s'. Please reply in the json as the format: {word:xx, phonetic: [xx], translations%s: [n.xx,adj.xx,......],similarWords:[a,b,c] }",
                        word, language, context);
            } else {
                systemMessage = String.format(
                        "translate the word '%s' into '%s''.Please reply in json:{word:x, phonetic: x, translations: n./adj.xxx, similarWords:[a,b,c]}",
                        word, language);
            }
        }

        return systemMessage;
    }

    public static GTPWordExlpain askGPTAsDictionary(String word, String context, Boolean generateImg, String language) {

        RestTemplate restTemplate = new RestTemplate();

        // Prepare the headers.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "Bearer " + apiToken);
        String systemMessage = getPrompt(word, context, generateImg, language);
        logger.info(systemMessage);
        // Prepare the f the request.
        Map<String, Object> bodyMap = new HashMap<String, Object>();
        bodyMap.put("model", "gpt-3.5-turbo");
        bodyMap.put("messages", new Object[] {
                Map.of("role", "assistant", "content", systemMessage)
        });
        bodyMap.put("temperature", 0.2);

        // Build the request.
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(bodyMap, headers);
        String url = "https://api.openai.com/v1/chat/completions";

        // Send the request and get the response.
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        // Return the response body.
        String responseBoby = response.getBody();

        JSONObject jsonObject = JSON.parseObject(responseBoby);
        String content = jsonObject.getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");

        logger.info(content);
        return JSON.parseObject(content, GTPWordExlpain.class);

    }

    public static String askGPT(String word) {

        RestTemplate restTemplate = new RestTemplate();

        // Prepare the headers.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "Bearer " + apiToken);

        String systemMessage = String.format(
                "You are excellent English teacher, every time I ask you about a new word or phrase, you can alway give me  1.one example sentence and 2.generate a picture prompt to describe the word and 3.a brief explain about the word and 4.some similar words. Here is the word: %s. Please return your answer in json with 4 keys [sentence , pic_prompt, explanation ,similar_words]",
                word);
        // Prepare the body of the request.
        Map<String, Object> body = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", new Object[] {
                        Map.of("role", "system", "content", systemMessage)
                });

        // Build the request.
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        String url = "https://api.openai.com/v1/chat/completions";

        // Send the request and get the response.
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        // Return the response body.
        return response.getBody();
    }

}
