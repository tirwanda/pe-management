package com.tirwanda.be.controller.downtime;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.downtime.PrintDowntimeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class GetDowntimeController {

    private final PrintDowntimeServiceImpl downtimeService;

    @GetMapping("/downtime/{downtimeId}")
    public ResponseEntity<ResponseData<Downtime>> getDowntimeById(@PathVariable Long downtimeId) {
        ResponseData<Downtime> responseData = new ResponseData<>();

        try {
            Downtime downtime = downtimeService.getDowntimeById(downtimeId);
            responseData.setPayload(downtime);
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            responseData.setStatus(false);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/downtime/asset/{assetNumber}")
    public ResponseEntity<ResponseData<List<Downtime>>> getDowntimeByAsset(@PathVariable String assetNumber) {
        ResponseData<List<Downtime>> responseData = new ResponseData<>();

        try {
            responseData.setPayload(downtimeService.getAllDowntimeByAsset(assetNumber));
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            responseData.setStatus(false);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/downtime/line/{lineCode}")
    public ResponseEntity<ResponseData<List<Downtime>>> getDowntimeByLine(@PathVariable String lineCode) {
        ResponseData<List<Downtime>> responseData = new ResponseData<>();

        try {
            responseData.setPayload(downtimeService.getAllDowntimeByLine(lineCode));
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            responseData.setStatus(false);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/downtime/section/{section}")
    public ResponseEntity<ResponseData<List<Downtime>>> getDowntimeBySection(@PathVariable String section) {
        ResponseData<List<Downtime>> responseData = new ResponseData<>();

        try {
            responseData.setPayload(downtimeService.getAllDowntimeBySection(section));
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            responseData.setStatus(false);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/downtime")
    public ResponseEntity<ResponseData<List<Downtime>>> getAllDowntime() {
        ResponseData<List<Downtime>> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(downtimeService.getAllDowntime());
        return ResponseEntity.ok().body(responseData);
    }
}
