package com.tirwanda.be.service.dashboard;

import com.tirwanda.be.dto.response.PieChartAssetDTO;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface PrintDashboardService {
    PieChartAssetDTO printPieChartAssetData(String username) throws ResourceNotFoundException;
}
