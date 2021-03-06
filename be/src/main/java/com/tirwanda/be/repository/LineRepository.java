package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    Line findLineByLineCode(String lineCode);
    List<Line> findLinesByCreatedBy(String username);
}
