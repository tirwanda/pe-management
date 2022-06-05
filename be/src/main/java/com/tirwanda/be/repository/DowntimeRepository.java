package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Apd;
import com.tirwanda.be.entity.Downtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DowntimeRepository extends JpaRepository<Downtime, Long> {
    List<Downtime> findDowntimeByWorkOrderContaining(String workOrder);
    List<Downtime> findDowntimeByStatus(String status);
    List<Downtime> findDowntimeByApdListContaining(Apd apd);
}
