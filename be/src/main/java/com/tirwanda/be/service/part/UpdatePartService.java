package com.tirwanda.be.service.part;

import com.tirwanda.be.dto.request.PartDTO;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdatePartService {
    Part updatePart(PartDTO partDTO) throws ResourceNotFoundException;
}
