package com.tirwanda.be.service.apd;

import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.ApdRepository;
import com.tirwanda.be.repository.DowntimeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DeleteApdServiceImpl implements DeleteApdService{

    private final ApdRepository apdRepository;
    private final DowntimeRepository downtimeRepository;

    @Override
    public Apd deleteApd(Long apdId) throws ResourceNotFoundException {
        Apd apd = apdRepository.findById(apdId)
                .orElseThrow(() -> new ResourceNotFoundException("Apd doesn't exist"));
        List<Downtime> downtimes = downtimeRepository.findDowntimeByApdListContaining(apd);

        if (downtimes != null) {
            for (Downtime downtime : downtimes) {
                downtime.getApdList().remove(apd);
            }
        }
        apdRepository.deleteById(apdId);
        return apd;
    }
}
