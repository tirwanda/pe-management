package com.tirwanda.be.service.lineservice;

import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;

public interface CreateLineService {
    Line saveLine(Line line);
    User createLineAndSaveToUser(Line line, String username) throws IllegalAccessException;
}
