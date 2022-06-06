package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.dto.request.ReplacedPartsDTO;
import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateReplacedPartsService {
    ReplacedParts updateReplacedParts(ReplacedPartsDTO replacedPartsDTO) throws ResourceNotFoundException;
}
