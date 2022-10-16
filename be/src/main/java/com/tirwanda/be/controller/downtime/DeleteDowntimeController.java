package com.tirwanda.be.controller.downtime;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.downtime.DeleteDowntimeServiceImpl;
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
public class DeleteDowntimeController {

    private final DeleteDowntimeServiceImpl deleteDowntimeService;

    @DeleteMapping("/downtime/{downtimeId}")
    public ResponseEntity<ResponseData<Downtime>> deleteDowntime(@PathVariable Long downtimeId) {

        ResponseData<Downtime> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            responseData.setPayload(deleteDowntimeService.deleteDowntime(downtimeId));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
