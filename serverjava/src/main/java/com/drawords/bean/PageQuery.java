package com.drawords.bean;

import lombok.Data;

@Data
public class PageQuery {

    private int pageSize;
    private int pageNum;
    private String query_key;

}
