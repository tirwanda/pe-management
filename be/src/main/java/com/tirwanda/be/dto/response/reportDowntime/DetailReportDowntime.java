package com.tirwanda.be.dto.response.reportDowntime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DetailReportDowntime {
    private String date;
    private String assetName;
    private String assetNumber;
    private Integer frequency;
    private Integer downtimeMinute;
    private Double mttrValue;
    private Double mtbfValue;
}
