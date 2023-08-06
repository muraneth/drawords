package com.drawords.bean;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class User implements Serializable {

    private Long id;
    private String name;
    private String crypto_address;
    private String signature;
    private String email_addres;
}
