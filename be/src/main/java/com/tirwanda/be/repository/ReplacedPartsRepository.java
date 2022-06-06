package com.tirwanda.be.repository;

import com.tirwanda.be.entity.ReplacedParts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplacedPartsRepository extends JpaRepository<ReplacedParts, Long> {
}
