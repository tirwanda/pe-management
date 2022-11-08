package com.tirwanda.be.service.reportDowntimeMC;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.entity.ReportDowntimeMc;
import com.tirwanda.be.repository.ReportDowntimeMcRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CreateReportDowntimeMcServiceImpl implements CreateReportDowntimeMcService {

    private final ReportDowntimeMcRepository reportDowntimeMcRepository;

    @Override
    public ReportDowntimeMc saveReportDowntime(Downtime downtime) {

        ReportDowntimeMc reportDowntimeMcUpdate = null;

        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM, yyyy");
        Date downtimeDate = new Date(downtime.getStartedDate());
        String stringDate = dateFormat.format(downtimeDate);

        List<ReportDowntimeMc> reportDowntimeMcList =
                reportDowntimeMcRepository.findReportDowntimeMcByDate(stringDate);

        boolean reportIsEmpty = true;

        for (ReportDowntimeMc reportCheck : reportDowntimeMcList) {
            if (reportCheck.getAssetNumber().equals(downtime.getAssetNumber())) {
                reportDowntimeMcUpdate = reportDowntimeMcRepository
                                .findReportDowntimeMcByAssetNumberAndDate(reportCheck.getAssetNumber(), stringDate);
                reportIsEmpty = false;
            }
        }

        if (reportIsEmpty) {
            Double mttr = downtime.getDowntimeMinute() / 60.00;
            Double mtbf = (22.00 * 24.00);

            ReportDowntimeMc reportDowntimeMc = ReportDowntimeMc.builder()
                    .date(dateFormat.format(downtimeDate))
                    .lineName(downtime.getLineName())
                    .assetName(downtime.getAssetName())
                    .assetNumber(downtime.getAssetNumber())
                    .frequency(1)
                    .downtimeMinute(downtime.getDowntimeMinute())
                    .mttrValue(mttr)
                    .mtbfValue(mtbf)
                    .build();
            return reportDowntimeMcRepository.save(reportDowntimeMc);
        } else {
            assert false;
            int frequency = reportDowntimeMcUpdate.getFrequency() + 1;
            int downtimeMinute = reportDowntimeMcUpdate.getDowntimeMinute() + downtime.getDowntimeMinute();

            Double mttr = ( downtimeMinute / frequency ) / 60.00;
            Double mtbf = ( 22.00 / frequency ) * 24.00;

            reportDowntimeMcUpdate.setFrequency(frequency);
            reportDowntimeMcUpdate.setDowntimeMinute(downtimeMinute);
            reportDowntimeMcUpdate.setMttrValue(mttr);
            reportDowntimeMcUpdate.setMtbfValue(mtbf);

            return reportDowntimeMcRepository.save(reportDowntimeMcUpdate);
        }
    }
}
