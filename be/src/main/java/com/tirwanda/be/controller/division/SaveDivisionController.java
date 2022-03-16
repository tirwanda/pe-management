package com.tirwanda.be.controller.division;

import com.tirwanda.be.dto.DivisionDTO;
import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.service.division.CreateDivisionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SaveDivisionController {

    private final CreateDivisionServiceImpl createDivisionService;
    private final ModelMapper modelMapper;

    @PostMapping("/division/save")
    public ResponseEntity<ResponseData<Division>> saveDivision(@Valid @RequestBody DivisionDTO divisionDTO,
                                                               Errors errors) {
        ResponseData<Division> responseData = new ResponseData<>();
        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            Division division = modelMapper.map(divisionDTO, Division.class);
            responseData.setStatus(true);
            responseData.setPayload(createDivisionService.saveDivision(division));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}
