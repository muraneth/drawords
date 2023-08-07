package com.drawords.bean.user;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class User implements Serializable {

    private Long id;
    private String name;
    private String cryptoAddress;
    private String sign;
    private String hashPassword;
    private String emailAddres;
}
