package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Asset;
import com.tirwanda.be.entity.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {
    Part findPartByPartNumber(String partNumber);
    List<Part> findPartsByAssetListNotContaining(Asset asset);
}
