package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class PartDTO {

    private Long partId;

    @NotEmpty(message = "Part number is required")
    private String partNumber;

    @NotEmpty(message = "Part name is required")
    private String partName;

    @NotEmpty(message = "UOM is required")
    private String UOM;
    private Integer stock;

    private String assetNumber;
}
