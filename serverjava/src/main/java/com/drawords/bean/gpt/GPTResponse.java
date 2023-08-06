package com.drawords.bean.gpt;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class GPTResponse<T> {
    private String id;
    private String model;
    private Map<String, Integer> usage;
    private List<GTPChoice> choices;
}
