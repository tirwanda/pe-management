package com.tirwanda.be.service.reportDowntimeMC;

import com.tirwanda.be.dto.response.reportDowntime.ResponseReportDowntimeMcDTO;

import java.util.List;

public interface PrintReportDowntimeMcService {
    List<ResponseReportDowntimeMcDTO> getAllReportDowntimeMC();
    List<ResponseReportDowntimeMcDTO> getReportDowntimeMcByDate(String date);
}
