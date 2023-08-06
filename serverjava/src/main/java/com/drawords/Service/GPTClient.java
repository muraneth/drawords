package com.drawords.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.Callable;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.util.logging.*;

public class GPTClient implements Callable {
    private static final Logger logger = Logger.getLogger(GPTClient.class.getName());

    private static final String apiToken = "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";

    private String word;

    public GPTClient(String word) {
        this.word = word;
    }

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

    public String askGPTAsDictionary(String word) {

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

    public String askGPT(String word) {

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

    @Override
    public Object call() throws Exception {

        String r = askGPT(word);
        logger.info(r);
        return r;
    }
}
