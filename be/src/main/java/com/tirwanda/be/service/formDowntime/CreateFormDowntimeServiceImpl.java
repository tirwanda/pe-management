package com.tirwanda.be.service.formDowntime;

import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.FormDowntime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.FormDowntimeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateFormDowntimeServiceImpl implements CreateFormDowntimeService{

    private final FormDowntimeRepository formDowntimeRepository;
    private final AssetRepository assetRepository;

    @Override
    public String saveFormDowntime(FormDowntime formDowntime) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(formDowntime.getAssetNumber());
        log.info("Asset Number : " + formDowntime.getAssetNumber());
        if (asset == null) {
            throw new ResourceNotFoundException("Resource doesn't exist Check Asset");
        }
        formDowntimeRepository.save(formDowntime);
        return "Success Save Form Downtime";
    }
}
