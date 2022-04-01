package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class AssetDTO {

    @NotEmpty(message = "Asset number is required")
    private String assetNumber;

    @NotEmpty(message = "Asset name is required")
    private String assetName;

    private String description;

    @NotEmpty(message = "Status is required")
    private String status;

    @NotEmpty(message = "Line Code is required")
    private String lineCode;
}
