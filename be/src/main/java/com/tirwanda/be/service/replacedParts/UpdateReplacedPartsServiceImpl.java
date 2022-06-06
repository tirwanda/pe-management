package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.dto.request.ReplacedPartsDTO;
import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.ReplacedPartsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UpdateReplacedPartsServiceImpl implements UpdateReplacedPartsService {

    private final ReplacedPartsRepository replacedPartsRepository;

    @Override
    public ReplacedParts updateReplacedParts(ReplacedPartsDTO replacedPartsDTO) throws ResourceNotFoundException {
        ReplacedParts replacedParts = replacedPartsRepository.findById(replacedPartsDTO.getReplacedPartId())
                .orElseThrow(() -> new ResourceNotFoundException("Part doesn't exist"));

        replacedParts.setPartNumber(replacedPartsDTO.getPartNumber());
        replacedParts.setPartName(replacedPartsDTO.getPartName());
        replacedParts.setQuantity(replacedPartsDTO.getQuantity());
        replacedParts.setUom(replacedPartsDTO.getUom());
        return replacedPartsRepository.save(replacedParts);
    }
}
