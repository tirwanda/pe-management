package com.tirwanda.be.controller.department;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Department;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.department.PrintDepartmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GetDepartmentController {

    private final PrintDepartmentServiceImpl printDepartmentService;

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<ResponseData<Department>> getDepartment(@PathVariable Long departmentId)
            throws ResourceNotFoundException {

        ResponseData<Department> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printDepartmentService.getDepartment(departmentId));
        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/departments")
    public ResponseEntity<ResponseData<List<Department>>> getDepartments() {
        ResponseData<List<Department>> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printDepartmentService.getDepartments());
        return ResponseEntity.ok().body(responseData);
    }
}
