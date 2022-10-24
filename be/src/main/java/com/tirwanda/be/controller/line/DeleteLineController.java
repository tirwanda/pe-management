package com.tirwanda.be.controller.line;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.service.line.DeleteLineServiceImpl;
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
public class DeleteLineController {

    private final DeleteLineServiceImpl deleteLineService;

    @DeleteMapping("/line/delete/{lineCode}")
    public ResponseEntity<ResponseData<String>> deleteLine(@PathVariable String lineCode) {

        ResponseData<String> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            deleteLineService.deleteLine(lineCode);
            responseData.setPayload("Success Delete Line : " + lineCode);
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (RuntimeException exception) {
            responseData.setPayload(null);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

}
