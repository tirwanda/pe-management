package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.*;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.service.replacedParts.DeleteReplacedPartsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DeleteDowntimeServiceImpl implements DeleteDowntimeService{

    private final DowntimeRepository downtimeRepository;
    private final DeleteReplacedPartsServiceImpl deleteReplacedPartsService;

    @Override
    public Downtime deleteDowntime(Long downtimeId) throws ResourceNotFoundException {
        Downtime downtime = downtimeRepository.findById(downtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Downtime is doesn't exist"));


        if (downtime != null) {
            log.info("Downtime is exist");
            Asset asset = downtime.getAsset();
            asset.removeDowntime(downtime);
            Collection<ReplacedParts> replacedParts = downtime.getReplacedParts();

            downtime.setItemChecks(null);
            downtime.setApdList(null);

            if (!replacedParts.isEmpty()) {
                for (ReplacedParts replacedPart : replacedParts) {
                    try {
                        log.info("Deleting Replaced Part {}", replacedPart);
                        deleteReplacedPartsService.deleteReplacedParts(replacedPart.getReplacedPartId());
                    } catch (ResourceNotFoundException e) {
                        e.printStackTrace();
                    }
                }
            }

            downtimeRepository.delete(downtime);
        }
        return downtime;
    }
}
