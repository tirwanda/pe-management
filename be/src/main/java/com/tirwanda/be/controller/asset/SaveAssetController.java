package com.tirwanda.be.controller.asset;

import com.tirwanda.be.dto.request.AssetDTO;
import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.service.asset.CreateAssetServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SaveAssetController {

    private final CreateAssetServiceImpl createAssetService;
    private final ModelMapper modelMapper;

    @PostMapping("/asset/save")
    public ResponseEntity<ResponseData<Asset>> saveAsset(@RequestBody AssetDTO assetDTO, Errors errors) {

        ResponseData<Asset> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
            }
            Asset asset = modelMapper.map(assetDTO, Asset.class);
            responseData.setStatus(true);
            responseData.setPayload(createAssetService.saveAsset(asset, assetDTO.getLineCode()));

            return ResponseEntity.ok().body(responseData);

        } catch (ResourceExistsException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
