package com.tirwanda.be.service.reportDowntimeMC;

import com.tirwanda.be.entity.Downtime;
import com.tirwanda.be.entity.ReportDowntimeMc;

public interface CreateReportDowntimeMcService {
    ReportDowntimeMc saveReportDowntime(Downtime downtime);
}
