package com.tirwanda.be.service.dashboard;

import com.tirwanda.be.dto.response.DashboardDTO;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface PrintDashboardService {
    DashboardDTO printDashboardData(String username) throws ResourceNotFoundException;
}
