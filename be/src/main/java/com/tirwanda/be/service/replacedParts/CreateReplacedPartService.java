package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface CreateReplacedPartService {
    ReplacedParts saveReplacedParts(ReplacedParts replacedParts) throws ResourceNotFoundException;
}
