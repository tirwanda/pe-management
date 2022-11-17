package com.tirwanda.be.dto.response.lineChartDowntime;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DatasetsLineChart {
    private String label;
    private String color;
    private List<Integer> data = new ArrayList<>();
}