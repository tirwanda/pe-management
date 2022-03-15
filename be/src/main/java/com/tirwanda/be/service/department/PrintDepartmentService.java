package com.tirwanda.be.service.department;

import com.tirwanda.be.entity.Department;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintDepartmentService {
    Department getDepartment(Long departmentId) throws ResourceNotFoundException;
    List<Department> getDepartments();
}
