package com.tirwanda.be.service.lineservice;

import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class CreateLineServiceImpl implements CreateLineService{

    private final LineRepository lineRepository;
    private final UserRepository userRepository;

    @Override
    public Line saveLine(Line line) throws ResourceExistsException {
        Line lineCheck = lineRepository.findLineByLineCode(line.getLineCode());
        if (lineCheck != null) {
            throw new ResourceExistsException("Line already exists in database");
        }
        assert false;
        return lineRepository.save(lineCheck);
    }

    @Override
    public User createLineAndSaveToUser(Line line, String username) throws ResourceExistsException {
        Line lineCheck = lineRepository.findLineByLineCode(line.getLineCode());
        User user = userRepository.findByUsername(username);
        if (lineCheck != null) {
            throw new ResourceExistsException("Line already on database");
        }
        Line lineSave = lineRepository.save(line);
        user.getLines().add(lineSave);
        return user;
    }
}
