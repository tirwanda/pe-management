package com.tirwanda.be.service.asset;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CreateAssetServiceImpl implements CreateAssetService{

    private final AssetRepository assetRepository;
    private final LineRepository lineRepository;

    @Override
    public Asset saveAsset(Asset asset, String lineCode) throws ResourceExistsException {
        Asset assetCheck = assetRepository.findAssetByAssetNumber(asset.getAssetNumber());
        if (assetCheck != null) {
            throw new ResourceExistsException("Asset already exist on Database");
        }

        Line line = lineRepository.findLineByLineCode(lineCode);
        Asset assetSave = assetRepository.save(asset);

        line.getAssets().add(assetSave);
        return assetSave;
    }
}
