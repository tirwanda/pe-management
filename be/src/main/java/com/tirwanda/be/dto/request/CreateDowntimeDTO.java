package com.tirwanda.be.dto.request;

import com.tirwanda.be.entity.ItemCheck;
import com.tirwanda.be.entity.ReplacedParts;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Set;

@Data
public class CreateDowntimeDTO {
    @NotEmpty(message = "Asset number is required")
    private String assetNumber;

    @NotEmpty(message = "Asset name is required")
    private String assetName;

    @NotEmpty(message = "Work Order is required")
    private String workOrder;

    @NotEmpty(message = "Status is required")
    private String status;

    private String department;
    private String costCenter;
    private String WOType;
    private String sectionCode;
    private String requestBy;

    @NotEmpty(message = "Line is required")
    private String lineName;

    @NotEmpty(message = "Start Date is required")
    private Long startedDate;

    @NotEmpty(message = "Completed Date is required")
    private Long completedDate;

    @NotEmpty(message = "Downtime Hours is required")
    private Double downtimeHours;

    @NotEmpty(message = "Downtime Hours is required")
    private Integer downtimeMinute;

    @NotEmpty(message = "Approval is required")
    private String approval;

    private Set<ReplacedParts> replacedParts;

    private Set<ItemCheck> itemCheck;

    private List<ApdDTO> apd;
}
