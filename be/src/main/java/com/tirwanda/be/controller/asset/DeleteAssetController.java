package com.tirwanda.be.controller.asset;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.asset.DeleteAssetServiceImpl;
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
public class DeleteAssetController {

    private final DeleteAssetServiceImpl deleteAssetService;

    @DeleteMapping("/asset/{assetId}")
    public ResponseEntity<ResponseData<Asset>> deleteAsset(@PathVariable Long assetId) {
        ResponseData<Asset> responseData = new ResponseData<>();
        responseData.setStatus(false);

        try {
            responseData.setPayload(deleteAssetService.deleteAsset(assetId));
            responseData.setStatus(true);
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
