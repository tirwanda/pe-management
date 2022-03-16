package com.tirwanda.be.service.division;

import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DivisionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PrintDivisionServiceImpl implements PrintDivisionService{

    private final DivisionRepository divisionRepository;

    @Override
    public Division getDivision(Long divisionId) throws ResourceNotFoundException {
        return divisionRepository.findById(divisionId)
                .orElseThrow(() -> new ResourceNotFoundException("Division with ID: '" + divisionId + "' is not found"));
    }

    @Override
    public List<Division> getDivisions() {
        return divisionRepository.findAll();
    }
}
