package com.drawords.bean;

import lombok.Data;

@Data
public class MuxResponse<T> {

    private int code;
    private T result;
}
