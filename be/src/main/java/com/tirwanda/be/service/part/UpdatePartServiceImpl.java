package com.tirwanda.be.service.part;

import com.tirwanda.be.dto.request.PartDTO;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UpdatePartServiceImpl implements UpdatePartService {

    private final PartRepository partRepository;

    @Override
    public Part updatePart(PartDTO partDTO) throws ResourceNotFoundException {
        Part part = partRepository.findById(partDTO.getPartId()).orElseThrow(() ->
                new ResourceNotFoundException("Resource not found"));
        part.setPartName(partDTO.getPartName());
        part.setPartNumber(partDTO.getPartNumber());
        part.setPartName(partDTO.getPartName());
        part.setUOM(partDTO.getUOM());
        part.setStock(partDTO.getStock());
        return part;
    }
}
