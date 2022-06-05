package com.tirwanda.be.service.apd;

import com.tirwanda.be.dto.request.ApdDTO;
import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateApdService {
    Apd updateApd(ApdDTO apdDTO) throws ResourceNotFoundException;
}
