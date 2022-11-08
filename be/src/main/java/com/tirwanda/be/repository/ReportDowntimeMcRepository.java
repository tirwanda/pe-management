package com.tirwanda.be.repository;

import com.tirwanda.be.entity.ReportDowntimeMc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportDowntimeMcRepository extends JpaRepository<ReportDowntimeMc, Long> {
    ReportDowntimeMc findReportDowntimeMcByAssetNumberAndDate(String assetNumber, String date);
    List<ReportDowntimeMc> findReportDowntimeMcByDate(String date);
    List<ReportDowntimeMc> findReportDowntimeMcByLineName(String lineName);
    List<ReportDowntimeMc> findReportDowntimeMcByDateAndLineName(String date, String lineName);
}
