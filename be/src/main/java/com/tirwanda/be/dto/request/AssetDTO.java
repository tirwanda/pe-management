package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class AssetDTO {

    private Long assetId;

    @NotEmpty(message = "Asset number is required")
    private String assetNumber;

    @NotEmpty(message = "Asset name is required")
    private String assetName;

    @NotEmpty(message = "Status is required")
    private String status;

    @NotEmpty(message = "Line Code is required")
    private String lineCode;

    private String assetLocation;

    private String assetFunction;

    private String process;

    private String output;

    private Integer lastPoPrice;
}
