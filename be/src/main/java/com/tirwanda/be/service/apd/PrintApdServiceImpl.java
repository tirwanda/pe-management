package com.tirwanda.be.service.apd;

import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.ApdRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PrintApdServiceImpl implements PrintApdService {

    private final ApdRepository apdRepository;

    @Override
    public Apd getApd(String apdName) throws ResourceNotFoundException {
        Apd apd = apdRepository.findByApdName(apdName);
        if (apd == null) throw new ResourceNotFoundException("APD doesn't exist");
        return apd;
    }

    @Override
    public List<Apd> getAllApd() {
        return apdRepository.findAll();
    }
}
