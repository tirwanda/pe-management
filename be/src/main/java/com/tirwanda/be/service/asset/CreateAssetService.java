package com.tirwanda.be.service.asset;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceExistsException;

public interface CreateAssetService {
    Asset saveAsset(Asset asset, String lineCode) throws ResourceExistsException;
}
