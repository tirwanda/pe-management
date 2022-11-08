package com.tirwanda.be.service.reportDowntimeMC;

import com.tirwanda.be.dto.response.reportDowntime.DetailReportDowntime;
import com.tirwanda.be.dto.response.reportDowntime.ResponseReportDowntimeMcDTO;
import com.tirwanda.be.entity.ReportDowntimeMc;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.ReportDowntimeMcRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PrintReportDowntimeMcServiceImpl implements PrintReportDowntimeMcService {

    private final ReportDowntimeMcRepository reportDowntimeMcRepository;
    private final LineRepository lineRepository;

    @Override
    public List<ResponseReportDowntimeMcDTO> getAllReportDowntimeMC() {
        List<ResponseReportDowntimeMcDTO> responseReportDowntimeMcDTOList = new ArrayList<>();
        List<String> lineNames = lineRepository.findLineCode();

        for (String lineName : lineNames) {
            ResponseReportDowntimeMcDTO responseReportDowntimeMcDTO = new ResponseReportDowntimeMcDTO();
            responseReportDowntimeMcDTO.setLineName(lineName);

            log.info("Line Name : {}", lineName);
            List<ReportDowntimeMc> reportDowntimeMcList = reportDowntimeMcRepository
                    .findReportDowntimeMcByLineName(lineName);
            log.info("Report Downtime : {}", reportDowntimeMcList);

            if (reportDowntimeMcList.isEmpty()) {
                log.info("Report Downtime is Empty");
                responseReportDowntimeMcDTOList.add(responseReportDowntimeMcDTO);
            } else {
                log.info("Report Downtime is Not Empty");
                for (ReportDowntimeMc reportDowntimeMc : reportDowntimeMcList) {
                    DetailReportDowntime detailReportDowntime = DetailReportDowntime.builder()
                            .date(reportDowntimeMc.getDate())
                            .assetName(reportDowntimeMc.getAssetName())
                            .assetNumber(reportDowntimeMc.getAssetNumber())
                            .frequency(reportDowntimeMc.getFrequency())
                            .downtimeMinute(reportDowntimeMc.getDowntimeMinute())
                            .mttrValue(reportDowntimeMc.getMttrValue())
                            .mtbfValue(reportDowntimeMc.getMtbfValue())
                            .build();

                    responseReportDowntimeMcDTO.getDowntimes().add(detailReportDowntime);

                }
                responseReportDowntimeMcDTOList.add(responseReportDowntimeMcDTO);
            }
        }
        return responseReportDowntimeMcDTOList;
    }

    @Override
    public List<ResponseReportDowntimeMcDTO> getReportDowntimeMcByDate(String date) {
        List<ResponseReportDowntimeMcDTO> responseReportDowntimeMcDTOList = new ArrayList<>();
        List<String> lineNames = lineRepository.findLineCode();

        for (String lineName : lineNames) {
            ResponseReportDowntimeMcDTO responseReportDowntimeMcDTO = new ResponseReportDowntimeMcDTO();
            responseReportDowntimeMcDTO.setLineName(lineName);

            log.info("Line Name : {}", lineName);
            List<ReportDowntimeMc> reportDowntimeMcList = reportDowntimeMcRepository
                    .findReportDowntimeMcByDateAndLineName(date, lineName);
            log.info("Report Downtime : {}", reportDowntimeMcList);

            if (reportDowntimeMcList.isEmpty()) {
                log.info("Report Downtime is Empty");
                responseReportDowntimeMcDTOList.add(responseReportDowntimeMcDTO);
            } else {
                log.info("Report Downtime is Not Empty");
                for (ReportDowntimeMc reportDowntimeMc : reportDowntimeMcList) {
                    DetailReportDowntime detailReportDowntime = DetailReportDowntime.builder()
                            .date(reportDowntimeMc.getDate())
                            .assetName(reportDowntimeMc.getAssetName())
                            .assetNumber(reportDowntimeMc.getAssetNumber())
                            .frequency(reportDowntimeMc.getFrequency())
                            .downtimeMinute(reportDowntimeMc.getDowntimeMinute())
                            .mttrValue(reportDowntimeMc.getMttrValue())
                            .mtbfValue(reportDowntimeMc.getMtbfValue())
                            .build();

                    responseReportDowntimeMcDTO.getDowntimes().add(detailReportDowntime);

                }
                responseReportDowntimeMcDTOList.add(responseReportDowntimeMcDTO);
            }
        }

        return responseReportDowntimeMcDTOList;
    }
}
