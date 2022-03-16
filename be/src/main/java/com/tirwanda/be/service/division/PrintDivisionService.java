package com.tirwanda.be.service.division;

import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintDivisionService {
    Division getDivision(Long divisionId) throws ResourceNotFoundException;
    List<Division> getDivisions();
}
