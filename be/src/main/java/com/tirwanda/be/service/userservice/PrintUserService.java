package com.tirwanda.be.service.userservice;

import com.tirwanda.be.entity.User;

import java.util.List;

public interface PrintUserService {
    User getUser(String username);
    List<User> getUsers();
}
