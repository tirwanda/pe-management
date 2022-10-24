package com.tirwanda.be.service.line;

import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DeleteLineServiceImpl implements DeleteLineService{

    private final LineRepository lineRepository;
    private final UserRepository userRepository;

    @Override
    public void deleteLine(String lineCode) {
        Line line = lineRepository.findLineByLineCode(lineCode);

        if (line != null) {
            log.info("Line {} is exist", lineCode);
            User user = userRepository.findUserByLinesContaining(line);

            if (user != null) {
                log.info("User with line {} is exist", lineCode);
                user.getLines().remove(line);
                line.setAssets(null);
                lineRepository.delete(line);
                log.info("Success Deleting Line {}", lineCode);
            }

            if (user == null) {
                log.info("User with line {} is not found", lineCode);
                line.setAssets(null);
                lineRepository.delete(line);
                log.info("Success Deleting Line {}", lineCode);
            }
        }

        if (line == null) {
            log.info("Line {} is not found", lineCode);
        }
    }
}
