package com.tirwanda.be.service.asset;

import com.tirwanda.be.dto.request.AssetDTO;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateAssetService {
    Asset updateAsset(AssetDTO assetDTO) throws ResourceNotFoundException, ResourceExistsException;
}
