package com.tirwanda.be.controller.asset;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.asset.PrintAssetServiceImpl;
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
public class GetAssetController {

    private final PrintAssetServiceImpl printAssetService;

    @GetMapping("/asset/asset-no/{assetNumber}")
    public ResponseEntity<ResponseData<Asset>> getAsset(@PathVariable String assetNumber) {
        ResponseData<Asset> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            responseData.setPayload(printAssetService.getAsset(assetNumber));
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/asset/line/{lineCode}")
    public ResponseEntity<ResponseData<List<Asset>>> getAssetByLine(@PathVariable String lineCode) {
        ResponseData<List<Asset>> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            responseData.setPayload(printAssetService.getAssetsByLine(lineCode));
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/asset/user/{username}")
    public ResponseEntity<ResponseData<List<Asset>>> getAssetByUser(@PathVariable String username) {
        ResponseData<List<Asset>> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            responseData.setPayload(printAssetService.getAssetsByUser(username));
            responseData.setStatus(true);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/assets")
    public ResponseEntity<ResponseData<List<Asset>>> getAssets() {
        ResponseData<List<Asset>> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printAssetService.getAllAssets());
        return ResponseEntity.ok().body(responseData);
    }
}
