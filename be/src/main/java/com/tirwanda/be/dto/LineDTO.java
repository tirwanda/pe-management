package com.tirwanda.be.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class LineDTO {

    @NotEmpty(message = "Line code is required")
    private String lineCode;

    @NotEmpty(message = "Line name is required")
    private String lineName;
}
