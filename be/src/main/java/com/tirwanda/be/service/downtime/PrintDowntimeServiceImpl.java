package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrintDowntimeServiceImpl implements PrintDowntimeService{

    private final DowntimeRepository downtimeRepository;
    private final AssetRepository assetRepository;
    private final LineRepository lineRepository;
    private final UserRepository userRepository;

    @Override
    public List<Downtime> getAllDowntime() {
        return downtimeRepository.findAll();
    }

    @Override
    public List<Downtime> getAllDowntimeBySection(String section) throws ResourceNotFoundException {
        List<Downtime> downtimeList = new ArrayList<>();
        User user = userRepository.findBySection(section);
        
        if (user == null) throw new ResourceNotFoundException("Section doesn't exist");

        for (Line line : user.getLines()) {
            for (Asset asset : line.getAssets()) {
                downtimeList.addAll(asset.getDowntimes());
            }
        }
        return downtimeList;
    }

    @Override
    public List<Downtime> getAllDowntimeByLine(String lineCode) throws ResourceNotFoundException {
        Line line = lineRepository.findLineByLineCode(lineCode);
        List<Downtime> downtimeList = new ArrayList<>();
        if (line == null) throw new ResourceNotFoundException("Line doesn't exist");

        for (Asset asset : line.getAssets()) {
            downtimeList.addAll(asset.getDowntimes());
        }
        return downtimeList;
    }

    @Override
    public List<Downtime> getAllDowntimeByAsset(String assetNumber) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(assetNumber);

        if (asset == null) throw new ResourceNotFoundException("Asset doesn't exist");
        return new ArrayList<>(asset.getDowntimes());
    }

    @Override
    public Downtime getDowntimeById(Long id) throws ResourceNotFoundException {
        return downtimeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Downtime doesn't exist"));
    }
}
