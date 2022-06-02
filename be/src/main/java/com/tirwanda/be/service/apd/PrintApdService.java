package com.tirwanda.be.service.apd;

import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintApdService {
    Apd getApd(String apdName) throws ResourceNotFoundException;
    List<Apd> getAllApd();
}
