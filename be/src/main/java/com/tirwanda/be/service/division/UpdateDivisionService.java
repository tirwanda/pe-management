package com.tirwanda.be.service.division;

import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateDivisionService {
    Division addDepartmentToDivision(String divisionName, String departmentName) throws ResourceNotFoundException;
}
