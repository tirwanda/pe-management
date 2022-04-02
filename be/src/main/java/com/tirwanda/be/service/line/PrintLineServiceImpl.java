package com.tirwanda.be.service.line;

import com.tirwanda.be.entity.Line;
import com.tirwanda.be.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PrintLineServiceImpl implements PrintLineService{

    private final LineRepository lineRepository;

    @Override
    public Line getLine(String lineCode) {
        return lineRepository.findLineByLineCode(lineCode);
    }

    @Override
    public List<Line> getLines() {
        return lineRepository.findAll();
    }
}
