package com.tirwanda.be.service.userservice;

import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateUserService {
    User updateUser(User user) throws ResourceNotFoundException;
    User saveLineToUser(String lineCode, String username) throws ResourceNotFoundException;
}
