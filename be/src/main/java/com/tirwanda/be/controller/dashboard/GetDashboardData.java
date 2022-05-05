package com.tirwanda.be.controller.dashboard;

import com.tirwanda.be.dto.response.PieChartAssetDTO;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.dashboard.PrintDashboardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GetDashboardData {
    private final PrintDashboardServiceImpl printDashboardService;

    @GetMapping("/dashboard/pie-chart-asset/{username}")
    public ResponseEntity<PieChartAssetDTO> getPieChartAsset(@PathVariable String username) {
        try {
            PieChartAssetDTO pieChartAssetDTO = printDashboardService.printPieChartAssetData(username);
            return ResponseEntity.ok().body(pieChartAssetDTO);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
