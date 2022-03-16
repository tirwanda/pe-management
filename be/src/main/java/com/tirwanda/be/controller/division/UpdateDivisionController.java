package com.tirwanda.be.controller.division;

import com.tirwanda.be.dto.DivisionDTO;
import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.division.UpdateDivisionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UpdateDivisionController {

    private final UpdateDivisionServiceImpl updateDivisionService;

    @PutMapping("/division/add-department")
    public ResponseEntity<ResponseData<Division>> addDepartmentToDivision(@RequestBody DivisionDTO divisionDTO) {
        ResponseData<Division> responseData = new ResponseData<>();

        try {
            responseData.setPayload(updateDivisionService.addDepartmentToDivision(divisionDTO.getDivisionName(),
                    divisionDTO.getDepartmentName()));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}
