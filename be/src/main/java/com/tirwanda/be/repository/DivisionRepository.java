package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DivisionRepository extends JpaRepository<Division, Long> {
    Division findByDivisionName(String divisionName);
}
