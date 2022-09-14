package com.tirwanda.be.controller.formDowntime;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.entity.FormDowntime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.formDowntime.CreateFormDowntimeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class SaveFormDowntimeController {

    private final CreateFormDowntimeServiceImpl createFormDowntimeService;
    private final ModelMapper modelMapper;

    @PostMapping("/form-downtime/save")
    public ResponseEntity<ResponseData<String>> saveFormDowntime(@RequestBody FormDowntime formDowntime, Errors errors) {
        ResponseData<String> responseData = new ResponseData<>();
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

//            FormDowntime formDowntime = modelMapper.map(createDowntimeDTO, FormDowntime.class);
            responseData.setPayload(createFormDowntimeService.saveFormDowntime(formDowntime));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
