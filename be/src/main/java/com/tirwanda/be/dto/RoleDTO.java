package com.tirwanda.be.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RoleDTO {
    @NotEmpty(message = "Role Name is required")
    private String roleName;
}
