package com.tirwanda.be.service.dashboard;

import com.tirwanda.be.dto.response.Datasets;
import com.tirwanda.be.dto.response.PieChartAssetDTO;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PrintDashboardServiceImpl implements PrintDashboardService{
    private final LineRepository lineRepository;

    @Override
    public PieChartAssetDTO printPieChartAssetData(String username) throws ResourceNotFoundException {
        PieChartAssetDTO pieChartAssetDTO = new PieChartAssetDTO();
        Datasets datasets = new Datasets();
        datasets.setLabel("Assets");
        datasets.setBackgroundColors(Arrays.asList("info", "primary", "dark", "secondary"));

        List<Line> lineList = lineRepository.findLinesByCreatedBy(username);

        for (Line line : lineList) {
            pieChartAssetDTO.getLabels().add(line.getLineName());
            datasets.getData().add(line.getAssets().size());
        }

        pieChartAssetDTO.setDatasets(datasets);
        return pieChartAssetDTO;
    }
}
