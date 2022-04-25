package com.tirwanda.be.controller.part;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.PartAndAssetDTO;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.part.DeletePartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DeletePartController {

    private final DeletePartServiceImpl deletePartService;

    @DeleteMapping("/part/{partId}")
    public ResponseEntity<ResponseData<Part>> deletePart(@PathVariable Long partId) {
        ResponseData<Part> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            responseData.setPayload(deletePartService.deletePart(partId));
            responseData.setStatus(true);
            responseData.getMessage().add("Success Deleted Part");
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @DeleteMapping("/part/{assetNumber}/remove/{partNumber}")
    public ResponseEntity<ResponseData<String>> removePartFromAsset(@PathVariable String assetNumber,
                                                                  @PathVariable String partNumber) {
        ResponseData<String> responseData = new ResponseData<>();

        try {
            responseData.setStatus(true);
            responseData.setPayload(deletePartService.removePartFromAsset(assetNumber, partNumber));

            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
