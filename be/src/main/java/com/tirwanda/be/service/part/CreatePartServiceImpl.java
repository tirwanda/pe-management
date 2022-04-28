package com.tirwanda.be.service.part;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CreatePartServiceImpl implements CreatePartService {

    private final PartRepository partRepository;
    private final AssetRepository assetRepository;

    @Override
    public Part savePart(Part part) throws ResourceExistsException {
        Part partCheck = partRepository.findPartByPartNumber(part.getPartNumber());
        if (partCheck != null) {
            throw new ResourceExistsException("Part with part number: " + part.getPartNumber() + " already exist");
        }
        return partRepository.save(part);
    }

    @Override
    public Part savePartAndSaveToAsset(Part part, String assetNumber) throws ResourceExistsException, ResourceNotFoundException {
        Part partCheck = partRepository.findPartByPartNumber(part.getPartNumber());
        if (partCheck != null) {
            throw new ResourceExistsException("Part with part number: " + part.getPartNumber() + " already exist");
        }

        Asset asset = assetRepository.findAssetByAssetNumber(assetNumber);
        if (asset == null) {
            throw new ResourceNotFoundException("Asset with asset number: " + assetNumber + " is not found");
        }
        Part partSave = partRepository.save(part);
        asset.addPart(partSave);
        return partSave;
    }

    @Override
    public Part addPartToAsset(String partNumber, String assetNumber) throws ResourceNotFoundException{
        Part checkPart = partRepository.findPartByPartNumber(partNumber);
        Asset assetCheck = assetRepository.findAssetByAssetNumber(assetNumber);
        if (assetCheck == null || checkPart == null) {
            throw new ResourceNotFoundException("Asset is not found in Database");
        }

        assetCheck.addPart(checkPart);
        return checkPart;
    }
}
