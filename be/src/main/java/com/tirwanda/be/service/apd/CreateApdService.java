package com.tirwanda.be.service.apd;

import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceExistsException;

public interface CreateApdService {
    Apd saveApd(Apd apd) throws ResourceExistsException;
}
