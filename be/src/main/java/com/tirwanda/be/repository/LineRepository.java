package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    Line findLineByLineCode(String lineCode);
    Integer countLineByCreatedBy(String username);
}
