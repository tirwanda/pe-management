package com.tirwanda.be.service.department;

import com.tirwanda.be.entity.Department;
import com.tirwanda.be.exception.ResourceExistsException;

public interface CreateDepartmentService {
    Department saveDepartment(Department department) throws ResourceExistsException;
}
