package com.tirwanda.be.controller.downtime;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.downtime.UpdateDowntimeServiceImpl;
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
@RequiredArgsConstructor
@RequestMapping("/api")
public class UpdateDowntimeController {

    private final UpdateDowntimeServiceImpl updateDowntimeService;

    @PutMapping("/downtime/update")
    public ResponseEntity<ResponseData<Downtime>> updateDowntime(@RequestBody Downtime downtimeDTO, Errors errors) {

        ResponseData<Downtime> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            responseData.setPayload(updateDowntimeService.updateDowntime(downtimeDTO));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
