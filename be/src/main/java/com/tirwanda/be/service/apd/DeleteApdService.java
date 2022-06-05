package com.tirwanda.be.service.apd;

import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface DeleteApdService {
    Apd deleteApd(Long apdId) throws ResourceNotFoundException;
}
