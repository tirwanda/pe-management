package com.tirwanda.be.service.user;

import com.tirwanda.be.dto.projection.CustomUserDetail;
import com.tirwanda.be.entity.User;

import java.util.List;

public interface PrintUserService {
    User getUser(String username);
    List<User> getUsers();
    CustomUserDetail getCustomUserDetail(String username);
}
