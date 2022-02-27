package com.tirwanda.be.service.userservice;

import com.tirwanda.be.entity.Role;
import com.tirwanda.be.entity.User;

public interface CreateUserService {
    User saveUser(User user);
    void addRoleToUser(String username, String roleName);
}
