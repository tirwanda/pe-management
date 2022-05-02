package com.tirwanda.be.service.asset;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface DeleteAssetService {
    Asset deleteAsset(Long assetId) throws ResourceNotFoundException;
}
