package com.tirwanda.be.service.downtime;

import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface CreateDowntimeService {
    Downtime saveDowntime(CreateDowntimeDTO downtimeDTO) throws ResourceNotFoundException;
}
