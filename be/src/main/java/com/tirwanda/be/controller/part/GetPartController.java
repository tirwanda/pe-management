package com.tirwanda.be.controller.part;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.part.PrintPartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GetPartController {

    private final PrintPartServiceImpl printPartService;

    @GetMapping("/part/{partNumber}")
    public ResponseEntity<ResponseData<Part>> getPartByPartNumber(@PathVariable String partNumber) {
        ResponseData<Part> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printPartService.getPartByPartNumber(partNumber));
        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/part/by-asset/{assetNumber}")
    public ResponseEntity<ResponseData<List<Part>>> getPartByAssetNumber(@PathVariable String assetNumber) {
        ResponseData<List<Part>> responseData = new ResponseData<>();
        responseData.setStatus(false);
        try {
            responseData.setPayload(printPartService.getPartByAssetNumber(assetNumber));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @GetMapping("/parts")
    public ResponseEntity<ResponseData<List<Part>>> getAllParts() {
        ResponseData<List<Part>> responseData = new ResponseData<>();

        responseData.setStatus(true);
        responseData.setPayload(printPartService.getAllPart());
        return ResponseEntity.ok().body(responseData);
    }
}
