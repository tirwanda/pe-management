package com.tirwanda.be.service.asset;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintAssetService {
    Asset getAsset(String assetNumber) throws ResourceNotFoundException;
    List<Asset> getAssetsByLine(String lineCode) throws ResourceNotFoundException;
    List<Asset> getAssetsByUser(String username) throws ResourceNotFoundException;
    List<Asset> getAllAssets();
}
