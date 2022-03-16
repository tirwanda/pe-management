package com.tirwanda.be.service.division;

import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.repository.DivisionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CreateDivisionServiceImpl implements CreateDivisionService{

    private final DivisionRepository divisionRepository;

    @Override
    public Division saveDivision(Division division) throws ResourceExistsException {
        Division divisionCheck = divisionRepository.findByDivisionName(division.getDivisionName());
        if (divisionCheck != null)
            throw new ResourceExistsException("Division with name : '" + division.getDivisionName() + "' is already exists");

        return divisionRepository.save(division);
    }
}
