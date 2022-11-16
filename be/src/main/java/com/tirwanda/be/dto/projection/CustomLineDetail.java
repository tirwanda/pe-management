package com.tirwanda.be.dto.projection;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomLineDetail {

    private Long lineId;

    private String lineCode;

    private String lineName;

    private String description;

    private Integer cycleTime;
}
