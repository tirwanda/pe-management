package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;


public interface DeleteDowntimeService {
    Downtime deleteDowntime(Long downtimeId) throws ResourceNotFoundException;
}
