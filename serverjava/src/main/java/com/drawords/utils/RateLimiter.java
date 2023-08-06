package com.drawords.utils;

import java.util.concurrent.atomic.AtomicLong;

public class RateLimiter {
    private final long timeThresholdMillis;
    private final AtomicLong lastCallTimestamp = new AtomicLong(0L);

    public RateLimiter(long timeThresholdMillis) {
        this.timeThresholdMillis = timeThresholdMillis;
    }

    public boolean isAllowed() {
        long currentTime = System.currentTimeMillis();
        long lastCallTime = lastCallTimestamp.get();

        if (currentTime - lastCallTime >= timeThresholdMillis) {
            lastCallTimestamp.set(currentTime);
            return true;
        } else {
            return false;
        }
    }
}