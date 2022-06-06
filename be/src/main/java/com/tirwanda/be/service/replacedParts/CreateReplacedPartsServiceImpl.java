package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.repository.ReplacedPartsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CreateReplacedPartsServiceImpl implements CreateReplacedPartService {

    private final ReplacedPartsRepository replacedPartsRepository;

    @Override
    public ReplacedParts saveReplacedParts(ReplacedParts replacedParts) {
        return replacedPartsRepository.save(replacedParts);
    }
}
