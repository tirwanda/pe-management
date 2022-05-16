package com.tirwanda.be.service.downtime;

import com.tirwanda.be.dto.request.CreateDowntimeDTO;
import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.DowntimeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CreateDowntimeServiceImpl implements CreateDowntimeService{

    private final DowntimeRepository downtimeRepository;
    private final AssetRepository assetRepository;
    private final ModelMapper modelMapper;

    @Override
    public Downtime saveDowntime(CreateDowntimeDTO downtimeDTO) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(downtimeDTO.getAssetNumber());
        if (asset == null) {
            throw new ResourceNotFoundException("Asset doesn't exist");
        }

        Downtime downtime = modelMapper.map(downtimeDTO, Downtime.class);
        return downtimeRepository.save(downtime);
    }
}
