package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class LineDTO {

    @NotEmpty(message = "Line code is required")
    private String lineCode;

    @NotEmpty(message = "Line name is required")
    private String lineName;

    @NotEmpty(message = "Description is required")
    private String description;

    @NotNull(message = "cycleTime is required")
    private Integer cycleTime;
}
