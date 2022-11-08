package com.tirwanda.be.service.downtime;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.DowntimeRepository;
import com.tirwanda.be.service.reportDowntimeMC.CreateReportDowntimeMcServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ApprovalDowntimeServiceImpl implements ApprovalDowntimeService {

    private final DowntimeRepository downtimeRepository;
    private final CreateReportDowntimeMcServiceImpl createReportDowntimeMcService;

    @Override
    public Downtime approvalDowntime(Downtime downtimeDTO) throws ResourceNotFoundException {
        Downtime downtime = downtimeRepository.findById(downtimeDTO.getDowntimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Downtime is not found"));

        if (downtimeDTO.getApproval().equals("Approved")) {
            downtime.setApproval(downtimeDTO.getApproval());
            createReportDowntimeMcService.saveReportDowntime(downtime);
            return downtimeRepository.save(downtime);
        } else {
            downtime.setApproval(downtimeDTO.getApproval());
            return downtimeRepository.save(downtime);
        }
    }
}
