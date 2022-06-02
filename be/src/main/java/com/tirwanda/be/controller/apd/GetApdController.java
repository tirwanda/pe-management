package com.tirwanda.be.controller.apd;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.apd.PrintApdServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GetApdController {

    private final PrintApdServiceImpl printApdService;

    @GetMapping("/apd")
    public ResponseEntity<ResponseData<List<Apd>>> getAllApd() {
        ResponseData<List<Apd>> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printApdService.getAllApd());
        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/apd/{apdName}")
    public ResponseEntity<ResponseData<Apd>> getApdByName(@PathVariable String apdName) {
        ResponseData<Apd> responseData = new ResponseData<>();

        try {
            responseData.setPayload(printApdService.getApd(apdName));
            responseData.setStatus(true);
            return ResponseEntity.ok(responseData);
        } catch (ResourceNotFoundException exception) {
            responseData.setStatus(false);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
