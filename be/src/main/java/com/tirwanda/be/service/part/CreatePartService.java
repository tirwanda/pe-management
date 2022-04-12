package com.tirwanda.be.service.part;

import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface CreatePartService {
    Part savePart(Part part) throws ResourceExistsException;
    Part savePartAndSaveToAsset(Part part, String assetNumber) throws ResourceExistsException, ResourceNotFoundException;
    Part addPartToAsset(String partNumber, String assetNumber) throws ResourceNotFoundException;
}