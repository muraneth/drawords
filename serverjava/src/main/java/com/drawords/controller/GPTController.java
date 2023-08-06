package com.drawords.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drawords.Service.GPTClient;
import com.drawords.utils.RateLimiter;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@RestController
public class GPTController {
    ExecutorService executorService = Executors.newFixedThreadPool(1);

    private final RateLimiter rateLimiter = new RateLimiter(1000); // Set the time threshold to 1000ms (1 second)

    @GetMapping("/gpt3")
    public String getGpt3Response() {

        if (rateLimiter.isAllowed()) {

            Future<String> futureResult = executorService.submit(new GPTClient("retrieve"));
            return "Success";
        } else {
            System.out.println("Too many calls. Please wait.");
            return "Too many calls. Please wait.";
        }

    }
}
