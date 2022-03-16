package com.tirwanda.be.service.division;

import com.tirwanda.be.entity.Department;
import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DepartmentRepository;
import com.tirwanda.be.repository.DivisionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UpdateDivisionServiceImpl implements UpdateDivisionService{

    private final DivisionRepository divisionRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public Division addDepartmentToDivision(String divisionName, String departmentName) throws ResourceNotFoundException {
        Division division = divisionRepository.findByDivisionName(divisionName);
        Department department = departmentRepository.findByDepartmentName(departmentName);

        if (division == null || department == null) {
            throw new ResourceNotFoundException("Division or Department is not found in Database");
        }
        division.getDepartment().add(department);
        return division;
    }
}
