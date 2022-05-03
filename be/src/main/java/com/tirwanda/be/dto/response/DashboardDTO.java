package com.tirwanda.be.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class DashboardDTO {
    private Integer lines;
    private Integer assets;
    private Integer parts;
    private List<Integer> totalAssets;
}
