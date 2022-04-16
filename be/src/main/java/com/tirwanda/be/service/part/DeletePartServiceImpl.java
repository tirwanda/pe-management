package com.tirwanda.be.service.part;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DeletePartServiceImpl implements DeletePartService{

    private final PartRepository partRepository;

    @Override
    public Part deletePart(Long partId) throws ResourceNotFoundException {
        Part part = partRepository.findById(partId).orElseThrow(() -> new ResourceNotFoundException("Part is not found"));
        List<Asset> assets = part.getAssetList();
        for (Asset asset : assets) {
            asset.getPartList().remove(part);
        }
        partRepository.deleteById(partId);
        return part;
    }

    @Override
    public Part removePartFromAsset(String assetNumber, String partNumber) throws ResourceNotFoundException {
        Part part = partRepository.findPartByPartNumber(partNumber);
        if (part == null) {
            throw new ResourceNotFoundException("Part is not found");
        }
        List<Asset> assets = part.getAssetList();
        for (Asset asset : assets) {
            asset.removePart(part);
        }
        return part;
    }
}
