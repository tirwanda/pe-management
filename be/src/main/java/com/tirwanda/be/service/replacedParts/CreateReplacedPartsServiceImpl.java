package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.entity.Part;
import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.PartRepository;
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
    private final PartRepository partRepository;

    @Override
    public ReplacedParts saveReplacedParts(ReplacedParts replacedParts) throws ResourceNotFoundException {
        Part part = partRepository.findPartByPartNumber(replacedParts.getPartNumber());

        if (part == null) throw new ResourceNotFoundException("Part is doesn't exist");

        part.setStock(Math.max(part.getStock() - replacedParts.getQuantity(), 0));
        partRepository.save(part);
        return replacedPartsRepository.save(replacedParts);
    }
}
