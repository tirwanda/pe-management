package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface ApprovalDowntimeService {
    Downtime approvalDowntime(Downtime downtimeDTO) throws ResourceNotFoundException;
}
