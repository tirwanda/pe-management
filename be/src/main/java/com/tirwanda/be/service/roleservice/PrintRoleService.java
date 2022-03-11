package com.tirwanda.be.service.roleservice;

import com.tirwanda.be.entity.Role;

import java.util.List;

public interface PrintRoleService {
    Role getRole(Long roleId);
    List<Role> getRoles();
}
