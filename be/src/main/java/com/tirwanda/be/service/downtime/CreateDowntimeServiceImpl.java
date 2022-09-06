package com.tirwanda.be.service.downtime;

import com.tirwanda.be.dto.request.ApdDTO;
import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.*;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.ApdRepository;
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
    private final ApdRepository apdRepository;
    
    private final CreateReplacedPartsServiceImpl createReplacedPartsService;
    private final CreateItemCheckServiceImpl createItemCheckService;

    @Transactional(rollbackFor = ResourceNotFoundException.class)
    @Override
    public Downtime saveDowntime(CreateDowntimeDTO downtimeDTO) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(downtimeDTO.getAssetNumber());
        Collection<Apd> apdList = new ArrayList<>();
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
                .sectionCode(downtimeDTO.getSectionCode())
                .approval(downtimeDTO.getApproval())
                .requestBy(downtimeDTO.getRequestBy())
                .startedDate(downtimeDTO.getStartedDate())
                .completedDate(downtimeDTO.getCompletedDate())
                .downtimeHours(downtimeDTO.getDowntimeHours())
                .downtimeMinute(downtimeDTO.getDowntimeMinute())
                .build();

        if (downtimeDTO.getApd() != null) {
            for (ApdDTO apd : downtimeDTO.getApd()) {
                apdList.add(apdRepository.findById(apd.getApdId())
                        .orElseThrow(() -> new ResourceNotFoundException("Apd doesn't exist")));
            }
            downtime.setApdList(apdList);
        }

        if (downtimeDTO.getItemCheck() != null) {
            for (ItemCheck check : downtimeDTO.getItemCheck()) {
                log.info(check.toString());
                itemCheck.add(createItemCheckService.saveItemCheck(check));
            }
            downtime.setItemChecks(itemCheck);
        }

        if (downtimeDTO.getReplacedParts() != null) {
            for (ReplacedParts parts : downtimeDTO.getReplacedParts()) {
                replacedParts.add(createReplacedPartsService.saveReplacedParts(parts));
            }
            downtime.setReplacedParts(replacedParts);
        }

        asset.getDowntimes().add(downtime);
        downtime.setAsset(asset);
        return downtimeRepository.save(downtime);
    }
}
