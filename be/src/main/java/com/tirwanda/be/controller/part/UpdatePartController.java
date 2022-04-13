package com.tirwanda.be.controller.part;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.PartDTO;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.part.UpdatePartServiceImpl;
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
public class UpdatePartController {

    private final UpdatePartServiceImpl updatePartService;

    @PutMapping("/part/update")
    public ResponseEntity<ResponseData<Part>> updatePart(@RequestBody PartDTO partDTO, Errors errors) {
        ResponseData<Part> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            responseData.setStatus(true);
            responseData.setPayload(updatePartService.updatePart(partDTO));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
