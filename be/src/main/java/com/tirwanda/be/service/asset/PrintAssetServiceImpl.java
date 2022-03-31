package com.tirwanda.be.service.asset;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.AssetRepository;
import com.tirwanda.be.repository.LineRepository;
import com.tirwanda.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PrintAssetServiceImpl implements PrintAssetService{

    private final AssetRepository assetRepository;
    private final LineRepository lineRepository;
    private final UserRepository userRepository;

    @Override
    public Asset getAsset(String assetNumber) throws ResourceNotFoundException {
        Asset asset = assetRepository.findAssetByAssetNumber(assetNumber);
        if (asset == null) throw new ResourceNotFoundException("Asset with asset number " + assetNumber + " is not found");

        return asset;
    }

    @Override
    public List<Asset> getAssetsByLine(String lineCode) throws ResourceNotFoundException {
        Line line = lineRepository.findLineByLineCode(lineCode);
        if (line == null) throw new ResourceNotFoundException("Line with line code " + lineCode + " is not found");
        return line.getAssets();
    }

    @Override
    public List<Asset> getAssetsByUser(String username) throws ResourceNotFoundException{
        User user = userRepository.findByUsername(username);
        if (user == null) throw new ResourceNotFoundException("User with username " + username + " is not found");

        List<Asset> assets = new ArrayList<>();
        List<Line> lines = user.getLines();
        for (Line line : lines) {
            assets.addAll(line.getAssets());
        }
        return assets;
    }

    @Override
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }
}
