package com.tirwanda.be.service.userservice;

import com.tirwanda.be.dto.ProfileDTO;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UpdateUserServiceImpl implements UpdateUserService {

    private final UserRepository userRepository;
    private final LineRepository lineRepository;

    @Override
    public User updateUser(ProfileDTO profileDTO) throws ResourceNotFoundException {
        User userUpdate = userRepository.findByUsername(profileDTO.getUsername());
        if (userUpdate == null)
            throw new ResourceNotFoundException("User with username : '" + profileDTO.getUsername() + "' is not found in database");
        userUpdate.setName(profileDTO.getName());
        userUpdate.setDescription(profileDTO.getDescription());
        userUpdate.setNrp(profileDTO.getExtension());
        userUpdate.setEmail(profileDTO.getEmail());
        userUpdate.setLocation(profileDTO.getLocation());
        return userRepository.save(userUpdate);
    }

    @Override
    public User saveLineToUser(String lineCode, String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        Line line = lineRepository.findLineByLineCode(lineCode);

        if (user == null || line == null)
            throw new ResourceNotFoundException("User or Line Code is not found in database");

        user.getLines().add(line);
        return user;
    }
}
