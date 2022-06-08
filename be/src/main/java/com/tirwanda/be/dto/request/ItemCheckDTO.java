package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ItemCheckDTO {

    private Long itemCheckId;

    @NotEmpty(message = "Item check is required")
    private String itemCheck;

    @NotEmpty(message = "Status is required")
    private Boolean status;
}
