package com.tirwanda.be.dto.response.lineChartDowntime;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class LineChartDowntimeDTO {
    private List<String> labels = new ArrayList<>();
    private List<DatasetsLineChart> datasets = new ArrayList<>();
}
