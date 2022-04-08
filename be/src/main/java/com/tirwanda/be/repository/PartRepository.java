package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {
    Part findPartByPartNumber(String partNumber);
}
