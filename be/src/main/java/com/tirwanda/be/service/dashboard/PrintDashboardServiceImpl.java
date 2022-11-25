package com.tirwanda.be.service.dashboard;

import com.tirwanda.be.dto.projection.CustomLineDetail;
import com.tirwanda.be.dto.response.lineChartDowntime.DatasetsLineChart;
import com.tirwanda.be.dto.response.pieChartAsset.DatasetsPieChart;
import com.tirwanda.be.dto.response.lineChartDowntime.LineChartDowntimeDTO;
import com.tirwanda.be.dto.response.pieChartAsset.PieChartAssetDTO;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.ReportDowntimeMc;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.ReportDowntimeMcRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PrintDashboardServiceImpl implements PrintDashboardService{

    private final LineRepository lineRepository;
    private final ReportDowntimeMcRepository reportDowntimeMcRepository;

    @Override
    public PieChartAssetDTO printPieChartAssetData(String username) throws ResourceNotFoundException {
        PieChartAssetDTO pieChartAssetDTO = new PieChartAssetDTO();
        DatasetsPieChart datasets = new DatasetsPieChart();
        datasets.setLabel("Assets");
        datasets.setBackgroundColors(Arrays.asList("info", "primary", "dark", "secondary"));

        List<Line> lineList = lineRepository.findAll();

        for (Line line : lineList) {
            pieChartAssetDTO.getLabels().add(line.getLineCode());
            datasets.getData().add(line.getAssets().size());
        }

        pieChartAssetDTO.setDatasets(datasets);
        return pieChartAssetDTO;
    }

    @Override
    public LineChartDowntimeDTO printLineChartData() {
        LineChartDowntimeDTO lineChartDowntimeDTO = new LineChartDowntimeDTO();

        List<String> colors = new ArrayList<>(Arrays.asList("info", "primary", "dark", "secondary"));
        lineChartDowntimeDTO.setLabels(Arrays
                .asList("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"));

        List<CustomLineDetail> lineList = lineRepository.findCustomLineDetail();


        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        String yearInString = String.valueOf(year);

        int index = 0;
        for (CustomLineDetail line : lineList) {
            DatasetsLineChart datasetsLineChart = new DatasetsLineChart();
            datasetsLineChart.setLabel(line.getLineName());
            datasetsLineChart.setColor(colors.get(index));

            for (String month : lineChartDowntimeDTO.getLabels()) {
                List<ReportDowntimeMc> reportDowntimeMcList = reportDowntimeMcRepository
                        .findReportDowntimeMcByDateAndLineName(month + ", " + yearInString, line.getLineCode());

                if (reportDowntimeMcList.isEmpty()) {
                    datasetsLineChart.getData().add(0);
                } else {
                    int minute = 0;
                    for (ReportDowntimeMc reportDowntimeMc : reportDowntimeMcList) {
                        minute = minute + reportDowntimeMc.getDowntimeMinute();
                    }
                    datasetsLineChart.getData().add(minute);
                }
            }

            lineChartDowntimeDTO.getDatasets().add(datasetsLineChart);
            index++;
        }

        return lineChartDowntimeDTO;
    }

    @Override
    public List<ReportDowntimeMc> printTopDowntimeMC() {
        List<ReportDowntimeMc> reportDowntimeMcList = new ArrayList<>();

        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        String yearInString = String.valueOf(year);
        List<ReportDowntimeMc> allReportDowntimeMcList = reportDowntimeMcRepository
                .findReportDowntimeMcByDateContainingOrderByDowntimeMinuteDesc(yearInString);

        for (int i = 0; i < 5; i++) {
            reportDowntimeMcList.add(allReportDowntimeMcList.get(i));
        }
        return reportDowntimeMcList;
    }
}
