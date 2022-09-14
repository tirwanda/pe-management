package com.tirwanda.be.service.formDowntime;

import com.tirwanda.be.entity.FormDowntime;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface CreateFormDowntimeService {
    String saveFormDowntime (FormDowntime formDowntime) throws ResourceNotFoundException;
}
