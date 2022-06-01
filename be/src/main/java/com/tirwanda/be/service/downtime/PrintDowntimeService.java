package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;

import java.util.List;

public interface PrintDowntimeService {
    List<Downtime> getAllDowntime();
    List<Downtime> getAllDowntimeBySection(String section) throws ResourceNotFoundException;
    List<Downtime> getAllDowntimeByLine(String lineCode) throws ResourceNotFoundException;
    List<Downtime> getAllDowntimeByAsset(String assetNumber) throws ResourceNotFoundException;
    Downtime getDowntimeById(Long id) throws ResourceNotFoundException;
}
