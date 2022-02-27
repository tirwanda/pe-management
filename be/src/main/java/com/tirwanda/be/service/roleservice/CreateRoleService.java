package com.tirwanda.be.service.roleservice;

import com.tirwanda.be.entity.Role;

public interface CreateRoleService {
    Role saveRole(Role role);
    void addUserToRole(String username, String roleName);
}
