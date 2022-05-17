package com.tirwanda.be.controller.downtime;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.downtime.CreateDowntimeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SaveDowntimeController {
    private final CreateDowntimeServiceImpl createDowntimeService;

    @PostMapping("/downtime/save")
    public ResponseEntity<ResponseData<Downtime>> saveDowntime(CreateDowntimeDTO downtimeDTO, Errors errors) {
        ResponseData<Downtime> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }

            responseData.setPayload(createDowntimeService.saveDowntime(downtimeDTO));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
