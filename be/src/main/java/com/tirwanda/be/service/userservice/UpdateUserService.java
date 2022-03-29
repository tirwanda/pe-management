package com.tirwanda.be.service.userservice;

import com.tirwanda.be.dto.ProfileDTO;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateUserService {
    User updateUser(ProfileDTO profileDTO) throws ResourceNotFoundException;
    User saveLineToUser(String lineCode, String username) throws ResourceNotFoundException;
}
