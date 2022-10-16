package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.entity.ItemCheck;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.repository.PartRepository;
import com.tirwanda.be.service.itemCheck.CreateItemCheckServiceImpl;
import com.tirwanda.be.service.replacedParts.CreateReplacedPartsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UpdateDowntimeServiceImpl implements UpdateDowntimeService {

    private final DowntimeRepository downtimeRepository;
    private final PartRepository partRepository;

    private final CreateItemCheckServiceImpl createItemCheckService;
    private final CreateReplacedPartsServiceImpl createReplacedPartsService;

    @Override
    public Downtime updateDowntime(Downtime downtimeDTO) throws ResourceNotFoundException {

        Downtime downtime = downtimeRepository.findById(downtimeDTO.getDowntimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Downtime is not found"));

        if (!downtime.getReplacedParts().equals(downtimeDTO.getReplacedParts())
                || !Objects.equals(downtime.getReplacedParts().toString(), downtimeDTO.getReplacedParts().toString())) {
            log.info("Replaced Parts is Updated");

            for (ReplacedParts replacedPart : downtime.getReplacedParts()) {
                Part part = partRepository.findPartByPartNumber(replacedPart.getPartNumber());
                part.setStock(part.getStock() + replacedPart.getQuantity());
                partRepository.save(part);
                log.info("Updated Stock Part: {}", part.getPartName());
            }

            downtime.getReplacedParts().removeAll(downtime.getReplacedParts());

            for (ReplacedParts part : downtimeDTO.getReplacedParts()) {
                ReplacedParts replacedParts = ReplacedParts.builder()
                        .partName(part.getPartName())
                        .partNumber(part.getPartNumber())
                        .quantity(part.getQuantity())
                        .uom(part.getUom())
                        .build();
                downtime.getReplacedParts().add(createReplacedPartsService.saveReplacedParts(replacedParts));

                log.info("Added Replaced Part: {}", part);
            }
        }

        if (!downtime.getItemChecks().equals(downtimeDTO.getItemChecks())
                || !Objects.equals(downtime.getItemChecks().toString(), downtimeDTO.getItemChecks().toString())) {
            log.info("Item Checks is Updated");

            downtime.getItemChecks().removeAll(downtime.getItemChecks());
            for (ItemCheck item : downtimeDTO.getItemChecks()) {
                ItemCheck itemCheck = ItemCheck.builder()
                        .itemCheck(item.getItemCheck())
                        .status(item.getStatus())
                        .build();
                downtime.getItemChecks().add(createItemCheckService.saveItemCheck(itemCheck));
                log.info("Update ItemCheck : Added ItemCheck {}", item);
            }
            log.info("Finish Updated Item Check");
        }

        if (!downtime.getApdList().equals(downtimeDTO.getApdList())) {
            downtime.getApdList().clear();
            log.info("Apd is Updated");
            downtime.setApdList(downtimeDTO.getApdList());
            log.info("Finish Updated APD List");
        }

        downtime.setWorkOrder(downtimeDTO.getWorkOrder());
        downtime.setStatus(downtimeDTO.getStatus());
        downtime.setDepartment(downtimeDTO.getDepartment());
        downtime.setCostCenter(downtimeDTO.getCostCenter());
        downtime.setWOType(downtimeDTO.getWOType());
        downtime.setSectionCode(downtimeDTO.getSectionCode());
        downtime.setAssetNumber(downtime.getAssetNumber());
        downtime.setApproval(downtimeDTO.getApproval());
        downtime.setRequestBy(downtimeDTO.getRequestBy());
        downtime.setStartedDate(downtimeDTO.getStartedDate());
        downtime.setCompletedDate(downtimeDTO.getCompletedDate());
        downtime.setAssetName(downtimeDTO.getAssetName());
        downtime.setDowntimeHours(downtimeDTO.getDowntimeHours());
        downtime.setLineName(downtimeDTO.getLineName());
        downtime.setDowntimeMinute(downtimeDTO.getDowntimeMinute());

        log.info("Downtime DTO : {}", downtimeDTO.getReplacedParts());
        log.info("Save Downtime: {}", downtime.getReplacedParts());

        return downtimeRepository.save(downtime);
    }
}
