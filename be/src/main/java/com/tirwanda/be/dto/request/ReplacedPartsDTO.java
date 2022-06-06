package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ReplacedPartsDTO {

    private Long replacedPartId;

    @NotEmpty(message = "Part number is required")
    private String partNumber;

    @NotEmpty(message = "Part name is required")
    private String partName;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotEmpty(message = "UOM is required")
    private String uom;
}
