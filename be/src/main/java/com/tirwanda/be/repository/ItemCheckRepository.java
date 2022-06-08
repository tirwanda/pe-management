package com.tirwanda.be.repository;

import com.tirwanda.be.entity.ItemCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCheckRepository extends JpaRepository<ItemCheck, Long> {
}
