package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.persistence.ElementCollection;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class CreateDowntimeDTO {
    @NotEmpty(message = "Asset number is required")
    private String assetNumber;

    @NotEmpty(message = "Work Order is require")
    private String workOrder;

    @NotEmpty(message = "Status is require")
    private String status;

    private String department;
    private String costCenter;
    private String WOType;
    private String sectionCode;
    private String requestBy;

    @NotEmpty(message = "Start Date is require")
    private Long startedDate;

    @NotEmpty(message = "Completed Date is require")
    private Long completedDate;

    @NotEmpty(message = "Downtime Hours is require")
    private Long downtimeHours;

    @ElementCollection
    private List<String> replacedParts;

    @ElementCollection
    private List<String> itemCheck;

    @ElementCollection
    private List<String> APD;
}
