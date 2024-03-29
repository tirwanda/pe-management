package com.tirwanda.be.service.replacedParts;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.entity.ReplacedParts;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.repository.PartRepository;
import com.tirwanda.be.repository.ReplacedPartsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DeleteReplacedPartsServiceImpl implements DeleteReplacedPartsService{

    private final ReplacedPartsRepository replacedPartsRepository;
    private final DowntimeRepository downtimeRepository;
    private final PartRepository partRepository;

    @Override
    public ReplacedParts deleteReplacedParts(Long replacedPartsId) throws ResourceNotFoundException {
        ReplacedParts replacedParts = replacedPartsRepository.findById(replacedPartsId)
                .orElseThrow(() -> new ResourceNotFoundException("Parts doesn't exist"));
        List<Downtime> downtimeList = downtimeRepository.findDowntimeByReplacedPartsContaining(replacedParts);
        Part part = partRepository.findPartByPartNumber(replacedParts.getPartNumber());

        for (Downtime downtime : downtimeList) {
            downtime.getReplacedParts().remove(replacedParts);
        }

        part.setStock(part.getStock() + replacedParts.getQuantity());

        partRepository.save(part);
        replacedPartsRepository.delete(replacedParts);
        return replacedParts;
    }
}
