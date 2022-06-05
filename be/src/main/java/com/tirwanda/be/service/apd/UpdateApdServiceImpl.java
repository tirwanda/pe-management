package com.tirwanda.be.service.apd;

import com.tirwanda.be.dto.request.ApdDTO;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.ApdRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UpdateApdServiceImpl implements UpdateApdService {

    private final ApdRepository apdRepository;

    @Override
    public Apd updateApd(ApdDTO apdDTO) throws ResourceNotFoundException {
        Apd apd = apdRepository.findById(apdDTO.getApdId())
                .orElseThrow(() -> new ResourceNotFoundException("Apd doesn't exist"));

        apd.setApdName(apdDTO.getApdName());
        return apdRepository.save(apd);
    }
}
