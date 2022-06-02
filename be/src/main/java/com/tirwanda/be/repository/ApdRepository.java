package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Apd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApdRepository extends JpaRepository<Apd, Long> {
    Apd findByApdName(String apdName);
}
