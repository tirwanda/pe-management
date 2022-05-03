package com.tirwanda.be.controller.dashboard;

import com.tirwanda.be.dto.response.DashboardDTO;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.dashboard.PrintDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class GetDashboardData implements PrintDashboardService {

    @Override
    public DashboardDTO printDashboardData(String username) throws ResourceNotFoundException {
        return null;
    }
}
