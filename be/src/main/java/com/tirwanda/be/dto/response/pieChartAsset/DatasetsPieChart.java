package com.tirwanda.be.dto.response.pieChartAsset;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DatasetsPieChart {
    private String label;
    private List<String> backgroundColors = new ArrayList<>();
    private List<Integer> data = new ArrayList<>();
}
