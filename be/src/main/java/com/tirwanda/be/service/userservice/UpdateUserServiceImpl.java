package com.tirwanda.be.service.userservice;

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
    public User updateUser(User user) throws ResourceNotFoundException {
        User userUpdate = userRepository.findByUsername(user.getUsername());
        if (userUpdate == null)
            throw new ResourceNotFoundException("User with username : '" + user.getUsername() + "' is not found in database");
        userUpdate.setName(user.getName());
        userUpdate.setSection(user.getSection());
        userUpdate.setDescription(user.getDescription());
        userUpdate.setNrp(user.getNrp());
        userUpdate.setEmail(user.getEmail());
        userUpdate.setExtension(user.getExtension());
        userUpdate.setLocation(user.getLocation());
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
