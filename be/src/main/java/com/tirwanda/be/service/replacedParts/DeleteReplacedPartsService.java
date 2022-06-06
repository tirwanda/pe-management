package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface DeleteReplacedPartsService {
    ReplacedParts deleteReplacedParts(Long replacedPartsId) throws ResourceNotFoundException;
}
