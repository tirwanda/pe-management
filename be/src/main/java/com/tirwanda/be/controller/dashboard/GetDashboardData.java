package com.tirwanda.be.controller.dashboard;

import com.tirwanda.be.dto.response.lineChartDowntime.LineChartDowntimeDTO;
import com.tirwanda.be.dto.response.pieChartAsset.PieChartAssetDTO;
import com.tirwanda.be.entity.ReportDowntimeMc;
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

import java.util.List;

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

    @GetMapping("/dashboard/line-chart-downtime")
    public ResponseEntity<LineChartDowntimeDTO> getLineChartDowntime() {
        LineChartDowntimeDTO lineChartDowntimeDTO = printDashboardService.printLineChartData();
        return ResponseEntity.ok().body(lineChartDowntimeDTO);
    }

    @GetMapping("/dashboard/top-downtime")
    public ResponseEntity<List<ReportDowntimeMc>> getTopDowntimeData() {
        List<ReportDowntimeMc> reportDowntimeMcList = printDashboardService.printTopDowntimeMC();
        return ResponseEntity.ok().body(reportDowntimeMcList);
    }
}
