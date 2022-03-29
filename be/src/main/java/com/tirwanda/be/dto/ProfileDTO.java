package com.tirwanda.be.dto;

import lombok.Data;

@Data
public class ProfileDTO {
    private String username;
    private String name;
    private String description;
    private Integer extension;
    private String email;
    private String location;
}
