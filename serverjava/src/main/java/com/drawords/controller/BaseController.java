package com.drawords.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import com.drawords.Service.UserService;
import com.drawords.bean.user.User;
import com.drawords.bean.user.UserContext;
import com.drawords.exception.UnauthorizedException;
import com.drawords.utils.UserContextHolder;

import jakarta.servlet.http.HttpServletRequest;

public abstract class BaseController {
    @Autowired
    private UserService userService; // Assuming you have a UserService that can get user details based on userId.

    protected void authorizeRequest(HttpServletRequest request) throws UnauthorizedException {
        String userId = request.getHeader("user_id");
        String userSign = request.getHeader("user_sign");
        String timestamp = request.getHeader("timestamp");

        User actualUser = userService.getUserById(Long.valueOf(userId));
        if (actualUser == null) {
            throw new UnauthorizedException("User not found");
        }

        String expectedSign = generateSignature(userId, actualUser.getHashPassword(), Long.parseLong(timestamp)); // You'd
                                                                                                                  // implement
                                                                                                                  // the
                                                                                                                  // generateSign
        // method.

        if (!expectedSign.equals(userSign)) {
            throw new UnauthorizedException("Invalid signature");
        }

        UserContext context = new UserContext();
        context.setUserId(actualUser.getId());
        context.setUserName(actualUser.getName());
        // set other fields as required

        UserContextHolder.setContext(context);
    }

    /**
     * Generates a signature using userId, password, and timestamp.
     * The signature remains consistent for a whole minute based on the timestamp
     * provided.
     *
     * @param userId    User's ID
     * @param password  User's password
     * @param timestamp The timestamp for which the signature is being generated.
     * @return The generated signature.
     * @throws NoSuchAlgorithmException If the algorithm is not supported.
     */
    public static String generateSignature(String userId, String password, long timestamp) {
        // Normalize the timestamp to the start of its respective minute.
        long startOfMinuteMillis = timestamp - (timestamp % (60 * 1000));
        Date normalizedTimestamp = new Date(startOfMinuteMillis);

        // Concatenate userId, normalized timestamp, and password.
        String dataToSign = userId + normalizedTimestamp.toString() + password;

        // Hash the concatenated string using SHA-256.
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {

            e.printStackTrace();
            return "error";
        }
        byte[] hashedBytes = digest.digest(dataToSign.getBytes());

        // Convert byte array into a hexadecimal string representation.
        StringBuilder sb = new StringBuilder();
        for (byte b : hashedBytes) {
            sb.append(String.format("%02x", b));
        }

        return sb.toString();
    }

}