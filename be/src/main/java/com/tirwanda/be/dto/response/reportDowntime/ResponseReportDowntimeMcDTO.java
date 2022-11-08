package com.tirwanda.be.dto.response.reportDowntime;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ResponseReportDowntimeMcDTO {
    private String lineName;
    private List<DetailReportDowntime> downtimes = new ArrayList<>();
}
