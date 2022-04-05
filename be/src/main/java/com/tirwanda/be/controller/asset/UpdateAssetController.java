package com.tirwanda.be.controller.asset;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.AssetDTO;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.asset.UpdateAssetServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UpdateAssetController {

    private final UpdateAssetServiceImpl updateAssetService;

    @PutMapping("/asset/update")
    public ResponseEntity<ResponseData<Asset>> updateAsset(@RequestBody AssetDTO assetDTO, Errors errors) {
        ResponseData<Asset> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            responseData.setStatus(true);
            responseData.setPayload(updateAssetService.updateAsset(assetDTO));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException | ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
