package com.drawords.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drawords.Service.translate.GPTClient;
import com.drawords.utils.RateLimiter;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class GPTController {
    ExecutorService executorService = Executors.newFixedThreadPool(1);

    private final RateLimiter rateLimiter = new RateLimiter(1000); // Set the time threshold to 1000ms (1 second)

}
