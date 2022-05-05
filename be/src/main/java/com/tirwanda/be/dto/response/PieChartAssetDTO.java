package com.tirwanda.be.dto.response;

import lombok.Data;

import java.util.ArrayList;

@Data
public class PieChartAssetDTO {
    private ArrayList<String> labels = new ArrayList<>();
    private Datasets datasets;
}
