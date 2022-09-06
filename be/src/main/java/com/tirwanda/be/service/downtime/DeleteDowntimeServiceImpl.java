package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.*;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.service.itemCheck.DeleteItemCheckServiceImpl;
import com.tirwanda.be.service.replacedParts.DeleteReplacedPartsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DeleteDowntimeServiceImpl implements DeleteDowntimeService{

    private final DowntimeRepository downtimeRepository;
    private final DeleteReplacedPartsServiceImpl deleteReplacedPartsService;
    private final DeleteItemCheckServiceImpl deleteItemCheckService;

    @Override
    public Optional<Downtime> deleteDowntime(Long downtimeId) {
        Downtime downtime = downtimeRepository.findById(downtimeId).orElse(null);

        if (downtime != null) {
            Asset asset = downtime.getAsset();
            asset.removeDowntime(downtime);
            Set<ReplacedParts> replacedParts = downtime.getReplacedParts();
            Set<ItemCheck> itemChecks = downtime.getItemChecks();

            downtime.setApdList(null);

            for (ItemCheck itemCheck : itemChecks) {
                downtime.getItemChecks().remove(itemCheck);
                deleteItemCheckService.DeleteItemCheck(itemCheck.getItemCheckId());
            }

            for (ReplacedParts replacedPart : replacedParts) {
                try {
                    deleteReplacedPartsService.deleteReplacedParts(replacedPart.getReplacedPartId());
                } catch (ResourceNotFoundException e) {
                    e.printStackTrace();
                }
            }
            downtimeRepository.deleteById(downtimeId);
        }

        return Optional.ofNullable(downtime);
    }
}
