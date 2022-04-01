package com.tirwanda.be.dto.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class DepartmentDTO {
    @NotEmpty(message = "Department name is required")
    private String departmentName;
}
