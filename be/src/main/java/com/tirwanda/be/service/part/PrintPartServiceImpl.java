package com.tirwanda.be.service.part;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PrintPartServiceImpl implements PrintPartService {

    private final PartRepository partRepository;
    private final AssetRepository assetRepository;

    @Override
    public Part getPartByPartNumber(String partNumber) {
        return partRepository.findPartByPartNumber(partNumber);
    }

    @Override
    public List<Part> getPartByAssetNumber(String assetNumber) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(assetNumber);
        if (asset == null) {
            throw new ResourceNotFoundException("Asset with asset number: " + assetNumber + " is not found");
        }
        return asset.getPartList();
    }

    @Override
    public List<Part> getPartsNotInAsset(String assetNumber) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(assetNumber);
        if (asset == null) {
            throw new ResourceNotFoundException("Asset with asset number: " + assetNumber + " is not found");
        }

        return partRepository.findPartsByAssetListNotContaining(asset);
    }

    @Override
    public List<Part> getAllPart() {
        return partRepository.findAll();
    }
}
