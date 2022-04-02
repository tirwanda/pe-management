package com.tirwanda.be.service.user;

import com.tirwanda.be.entity.User;

public interface CreateUserService {
    User saveUser(User user);
    void addRoleToUser(String username, String roleName);
}