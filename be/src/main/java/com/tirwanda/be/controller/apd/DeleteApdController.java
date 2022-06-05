package com.tirwanda.be.controller.apd;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.apd.DeleteApdServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DeleteApdController {

    private final DeleteApdServiceImpl deleteApdService;

    @DeleteMapping("/apd/{apdId}")
    public ResponseEntity<ResponseData<Apd>> deleteApd(@PathVariable Long apdId) {
        ResponseData<Apd> responseData = new ResponseData<>();

        try {
            responseData.setPayload(deleteApdService.deleteApd(apdId));
            responseData.setStatus(true);
            return ResponseEntity.ok(responseData);
        } catch (ResourceNotFoundException exception) {
            responseData.setStatus(false);
            throw new  ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
