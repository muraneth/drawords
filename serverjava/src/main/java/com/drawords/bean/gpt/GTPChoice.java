package com.drawords.bean.gpt;

import lombok.Data;

@Data
public class GTPChoice {
    private int index;
    private GTPMessage message;
    private String finish_reason;
}
