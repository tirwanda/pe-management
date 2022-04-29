package com.tirwanda.be.service.part;

import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintPartService {
    Part getPartByPartNumber(String partNumber);
    List<Part> getPartByAssetNumber(String assetNumber) throws ResourceNotFoundException;
    List<Part> getPartsNotInAsset(String assetNumber) throws ResourceNotFoundException;
    List<Part> getAllPart();
}
