package com.tirwanda.be.service.lineservice;

import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceExistsException;

public interface CreateLineService {
    Line saveLine(Line line) throws ResourceExistsException;
    User createLineAndSaveToUser(Line line, String username) throws ResourceExistsException;
}
