package com.tirwanda.be.dto.response.pieChartAsset;

import lombok.Data;

import java.util.ArrayList;

@Data
public class PieChartAssetDTO {
    private ArrayList<String> labels = new ArrayList<>();
    private DatasetsPieChart datasets;
}
