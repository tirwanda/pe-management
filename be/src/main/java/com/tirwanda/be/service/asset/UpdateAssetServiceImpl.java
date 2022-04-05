package com.tirwanda.be.service.asset;

import com.tirwanda.be.dto.request.AssetDTO;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UpdateAssetServiceImpl implements UpdateAssetService{
    private final AssetRepository assetRepository;

    @Override
    public Asset updateAsset(AssetDTO asset) throws ResourceNotFoundException, ResourceExistsException {
        Asset assetUpdate = assetRepository.findById(asset.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset is not found in Database"));

        assetUpdate.setAssetNumber(asset.getAssetNumber());
        assetUpdate.setAssetName(asset.getAssetName());
        assetUpdate.setAssetFunction(asset.getAssetFunction());
        assetUpdate.setAssetLocation(asset.getAssetLocation());
        assetUpdate.setOutput(asset.getOutput());
        assetUpdate.setProcess(asset.getProcess());
        assetUpdate.setStatus(asset.getStatus());
        assetUpdate.setLastPoPrice(asset.getLastPoPrice());

        return assetRepository.save(assetUpdate);
    }
}
