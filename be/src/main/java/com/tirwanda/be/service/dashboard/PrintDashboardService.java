package com.tirwanda.be.service.dashboard;

import com.tirwanda.be.dto.response.lineChartDowntime.LineChartDowntimeDTO;
import com.tirwanda.be.dto.response.pieChartAsset.PieChartAssetDTO;
import com.tirwanda.be.entity.ReportDowntimeMc;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintDashboardService {
    PieChartAssetDTO printPieChartAssetData(String username) throws ResourceNotFoundException;
    LineChartDowntimeDTO printLineChartData();
    List<ReportDowntimeMc> printTopDowntimeMC();
}
