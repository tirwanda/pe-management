package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class PartAndAssetDTO {
    @NotEmpty(message = "Part Number is required")
    private String partNumber;
    @NotEmpty(message = "Asset Number is required")
    private String assetNumber;
}
