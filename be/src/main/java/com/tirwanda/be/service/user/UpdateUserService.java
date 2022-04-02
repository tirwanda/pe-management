package com.tirwanda.be.service.user;

import com.tirwanda.be.dto.request.ProfileDTO;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateUserService {
    User updateUser(ProfileDTO profileDTO) throws ResourceNotFoundException;
    User saveLineToUser(String lineCode, String username) throws ResourceNotFoundException;
}
