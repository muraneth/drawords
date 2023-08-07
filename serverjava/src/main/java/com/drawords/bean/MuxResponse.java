package com.drawords.bean;

public class MuxResponse<T> {

    private final int code; // marked as final for immutability
    private final T result; // marked as final for immutability
    private final String message; // marked as final for immutability

    public MuxResponse(int code, T result, String message) {
        this.code = code;
        this.result = result;
        this.message = message;
    }

    // Added the generic type <T> here
    public static <T> MuxResponse<T> buildErrorResponse(String errMsg) {
        return new MuxResponse<>(500, null, errMsg);
    }

    // Added the generic type <T> here
    public static <T> MuxResponse<T> buildSuccessResponse(T result) {
        return new MuxResponse<>(200, result, "Success");
    }

    // Getters for the fields
    public int getCode() {
        return code;
    }

    public T getResult() {
        return result;
    }

    public String getMessage() {
        return message;
    }
}
