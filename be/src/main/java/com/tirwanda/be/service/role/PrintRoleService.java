package com.tirwanda.be.service.role;

import com.tirwanda.be.entity.Role;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintRoleService {
    Role getRole(Long roleId) throws ResourceNotFoundException;
    List<Role> getRoles();
}
