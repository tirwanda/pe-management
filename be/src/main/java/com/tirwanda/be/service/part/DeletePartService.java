package com.tirwanda.be.service.part;

import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface DeletePartService {
    Part deletePart(Long partId) throws ResourceNotFoundException;
    Part removePartFromAsset(String assetNumber, String partNumber) throws ResourceNotFoundException;
}
