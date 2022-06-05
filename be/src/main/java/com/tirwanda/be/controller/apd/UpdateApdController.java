package com.tirwanda.be.controller.apd;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.ApdDTO;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.apd.UpdateApdServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UpdateApdController {

    private final UpdateApdServiceImpl updateApdService;

    @PutMapping("/apd/update")
    public ResponseEntity<ResponseData<Apd>> updateApd(@RequestBody ApdDTO apdDTO, Errors errors) {
        ResponseData<Apd> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            responseData.setPayload(updateApdService.updateApd(apdDTO));
            responseData.setStatus(true);
            return ResponseEntity.ok(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
