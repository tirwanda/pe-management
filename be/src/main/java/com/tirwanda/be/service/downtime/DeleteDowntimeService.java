package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Downtime;

import java.util.Optional;

public interface DeleteDowntimeService {
    Optional<Downtime> deleteDowntime(Long downtimeId);
}
