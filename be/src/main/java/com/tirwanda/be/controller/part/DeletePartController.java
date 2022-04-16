package com.tirwanda.be.controller.part;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.part.DeletePartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<ResponseData<Part>> removePartFromAsset() {
        ResponseData<Part> responseData = new ResponseData<>();
        return ResponseEntity.ok().body(responseData);
    }
}
