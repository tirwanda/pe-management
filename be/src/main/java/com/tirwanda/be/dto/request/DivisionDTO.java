package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class DivisionDTO {

    @NotEmpty(message = "Division name is required")
    private String divisionName;

    private String departmentName;
}
