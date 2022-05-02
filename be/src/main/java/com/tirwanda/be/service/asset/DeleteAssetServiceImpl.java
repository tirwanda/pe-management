package com.tirwanda.be.service.asset;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DeleteAssetServiceImpl implements DeleteAssetService{

    private final AssetRepository assetRepository;

    @Override
    public Asset deleteAsset(Long assetId) throws ResourceNotFoundException {
        Asset asset = assetRepository.findById(assetId).orElseThrow(() -> new ResourceNotFoundException("Asset is not found"));

        List<Part> partList = asset.getPartList();
        for (Part part : partList) {
            part.getAssetList().remove(asset);
        }
        assetRepository.delete(asset);
        return asset;
    }
}
