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

    @DeleteMapping("/part/remove-part-from-asset")
    public ResponseEntity<ResponseData<Part>> removePartFromAsset(@RequestBody PartAndAssetDTO partAndAssetDTO, Errors errors) {
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
            responseData.setPayload(deletePartService.removePartFromAsset(partAndAssetDTO.getAssetNumber(),
                    partAndAssetDTO.getPartNumber()));

            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
