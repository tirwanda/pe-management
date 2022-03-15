package com.tirwanda.be.service.department;

import com.tirwanda.be.entity.Department;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PrintDepartmentServiceImpl implements PrintDepartmentService{

    private final DepartmentRepository departmentRepository;

    @Override
    public Department getDepartment(Long departmentId) throws ResourceNotFoundException {
        return departmentRepository.findById(departmentId).orElseThrow(() ->
                new ResourceNotFoundException("Department with id : '" + departmentId + "' not found"));
    }

    @Override
    public List<Department> getDepartments() {
        return departmentRepository.findAll();
    }
}
