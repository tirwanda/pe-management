package com.tirwanda.be.service.department;

import com.tirwanda.be.entity.Department;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CreateDepartmentServiceImpl implements CreateDepartmentService{

    private final DepartmentRepository departmentRepository;

    @Override
    public Department saveDepartment(Department department) throws ResourceExistsException {
        Department departmentCheck = departmentRepository.findByDepartmentName(department.getDepartmentName());
        if (departmentCheck != null)
            throw new ResourceExistsException("Department with name : '" + department.getDepartmentName() + "'is Already Exists");

        return departmentRepository.save(department);
    }
}
