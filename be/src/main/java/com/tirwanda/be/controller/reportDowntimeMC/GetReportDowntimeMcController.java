package com.tirwanda.be.controller.reportDowntimeMC;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.ReportDowntimeDTO;
import com.tirwanda.be.dto.response.reportDowntime.ResponseReportDowntimeMcDTO;
import com.tirwanda.be.service.reportDowntimeMC.PrintReportDowntimeMcServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GetReportDowntimeMcController {

    private final PrintReportDowntimeMcServiceImpl printReportDowntimeMcService;

    @GetMapping("/report-downtime/all")
    public ResponseEntity<ResponseData<List<ResponseReportDowntimeMcDTO>>> getAllReportDowntimeMc() {
        ResponseData<List<ResponseReportDowntimeMcDTO>> responseData = new ResponseData<>();
        responseData.setStatus(false);
        List<ResponseReportDowntimeMcDTO> responseReportDowntimeMcDTOList =
                printReportDowntimeMcService.getAllReportDowntimeMC();
        responseData.setStatus(true);
        responseData.setMessage(null);
        responseData.setPayload(responseReportDowntimeMcDTOList);
        return ResponseEntity.ok().body(responseData);
    }

    @PostMapping("/report-downtime")
    public ResponseEntity<ResponseData<List<ResponseReportDowntimeMcDTO>>> getReportDowntimeMcByDate(
            @RequestBody ReportDowntimeDTO reportDowntimeDTO) {
        ResponseData<List<ResponseReportDowntimeMcDTO>> responseData = new ResponseData<>();
        responseData.setStatus(false);
        List<ResponseReportDowntimeMcDTO> responseReportDowntimeMcDTOList =
                printReportDowntimeMcService.getReportDowntimeMcByDate(reportDowntimeDTO.getDate());
        responseData.setStatus(true);
        responseData.setMessage(null);
        responseData.setPayload(responseReportDowntimeMcDTOList);
        return ResponseEntity.ok().body(responseData);
    }
}
