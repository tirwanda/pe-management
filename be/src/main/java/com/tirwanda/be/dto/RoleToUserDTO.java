package com.tirwanda.be.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RoleToUserDTO {
    @NotEmpty(message = "Username is required")
    private String username;

    @NotEmpty(message = "Role Name is required")
    private String roleName;
}
