package com.tirwanda.be.controller.apd;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.ApdDTO;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.service.apd.CreateApdServiceImpl;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/api")
@RequiredArgsConstructor
public class SaveApdController {

    private final CreateApdServiceImpl createApdService;

    @PostMapping("/apd/save")
    public ResponseEntity<ResponseData<Apd>> saveApd(@RequestBody ApdDTO apdDTO, Errors errors) {
        ResponseData<Apd> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }

            Apd apd = Apd.builder().apdName(apdDTO.getApdName()).build();
            responseData.setPayload(createApdService.saveApd(apd));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException exception) {
            responseData.setStatus(false);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
