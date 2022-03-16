package com.tirwanda.be.service.division;

import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceExistsException;

public interface CreateDivisionService {
    Division saveDivision(Division division) throws ResourceExistsException;
}
