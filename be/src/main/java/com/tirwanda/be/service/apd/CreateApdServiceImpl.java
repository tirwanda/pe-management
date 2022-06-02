package com.tirwanda.be.service.apd;

import com.tirwanda.be.dto.request.ApdDTO;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.repository.ApdRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CreateApdServiceImpl implements CreateApdService{

    private final ApdRepository apdRepository;

    @Override
    public Apd saveApd(Apd apd) throws ResourceExistsException {
        Apd apdCheck = apdRepository.findByApdName(apd.getApdName());
        if (apdCheck != null) throw new ResourceExistsException("Apd is already exist");
        return apdRepository.save(apd);
    }
}
