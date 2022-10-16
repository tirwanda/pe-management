package com.tirwanda.be.service.downtime;

import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.*;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.service.itemCheck.CreateItemCheckServiceImpl;
import com.tirwanda.be.service.replacedParts.CreateReplacedPartsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CreateDowntimeServiceImpl implements CreateDowntimeService{

    private final DowntimeRepository downtimeRepository;
    private final AssetRepository assetRepository;
    
    private final CreateReplacedPartsServiceImpl createReplacedPartsService;
    private final CreateItemCheckServiceImpl createItemCheckService;

    @Transactional(rollbackFor = ResourceNotFoundException.class)
    @Override
    public Downtime saveDowntime(CreateDowntimeDTO downtimeDTO) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(downtimeDTO.getAssetNumber());
        Set<ReplacedParts> replacedParts = new HashSet<>();
        Set<ItemCheck> itemCheck = new HashSet<>();

        if (asset == null) {
            throw new ResourceNotFoundException("Resource doesn't exist Check Asset");
        }

        Downtime downtime = Downtime.builder()
                .workOrder(downtimeDTO.getWorkOrder())
                .status(downtimeDTO.getStatus())
                .department(downtimeDTO.getDepartment())
                .costCenter(downtimeDTO.getCostCenter())
                .WOType(downtimeDTO.getWOType())
                .assetNumber(downtimeDTO.getAssetNumber())
                .sectionCode(downtimeDTO.getSectionCode())
                .approval(downtimeDTO.getApproval())
                .requestBy(downtimeDTO.getRequestBy())
                .startedDate(downtimeDTO.getStartedDate())
                .completedDate(downtimeDTO.getCompletedDate())
                .assetName(downtimeDTO.getAssetName())
                .downtimeHours(downtimeDTO.getDowntimeHours())
                .lineName(downtimeDTO.getLineName())
                .downtimeMinute(downtimeDTO.getDowntimeMinute())
                .build();

        if (downtimeDTO.getApd() != null) {
            log.info("Apd is not empty");
            downtime.setApdList(downtimeDTO.getApd());
        }

        if (downtimeDTO.getItemCheck() != null) {
            log.info("Item check is not empty");
            for (ItemCheck check : downtimeDTO.getItemCheck()) {
                log.info("Adding item check : {}", check);
                itemCheck.add(createItemCheckService.saveItemCheck(check));
            }
            downtime.setItemChecks(itemCheck);
        }

        if (downtimeDTO.getReplacedParts() != null) {
            log.info("Replaced part is not empty");
            for (ReplacedParts parts : downtimeDTO.getReplacedParts()) {
                log.info("Adding replaced part : {}", parts);
                replacedParts.add(createReplacedPartsService.saveReplacedParts(parts));
            }
            downtime.setReplacedParts(replacedParts);
        }

        asset.getDowntimes().add(downtime);
        downtime.setAsset(asset);
        return downtimeRepository.save(downtime);
    }
}
