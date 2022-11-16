package com.tirwanda.be.dto.projection;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomUserDetail {

    private Long userId;

    private String username;

    private String email;

    private Integer nrp;

    private String name;

    private String description;

    private String section;

    private Integer extension;

    private String location;
}
