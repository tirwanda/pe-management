package com.tirwanda.be.controller.department;

import com.tirwanda.be.dto.request.DepartmentDTO;
import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Department;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.service.department.CreateDepartmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SaveDepartmentController {

    private final CreateDepartmentServiceImpl createDepartmentService;
    private final ModelMapper modelMapper;

    @PostMapping("/department/save")
    public ResponseEntity<ResponseData<Department>> saveDepartment(@Valid @RequestBody DepartmentDTO departmentDTO,
                                                                   Errors errors) {

        ResponseData<Department> responseData = new ResponseData<>();
        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            Department department = modelMapper.map(departmentDTO, Department.class);
            responseData.setStatus(true);
            responseData.setPayload(createDepartmentService.saveDepartment(department));

            return ResponseEntity.ok().body(responseData);

        } catch (ResourceExistsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}
