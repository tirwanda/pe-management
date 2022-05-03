package com.tirwanda.be.service.dashboard;

import com.tirwanda.be.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PrintDashboardServiceImpl {
    private final LineRepository lineRepository;
}
