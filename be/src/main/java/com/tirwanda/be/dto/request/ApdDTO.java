package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ApdDTO {

    private Long apdId;

    @NotEmpty(message = "APD name is required")
    private String apdName;
}
