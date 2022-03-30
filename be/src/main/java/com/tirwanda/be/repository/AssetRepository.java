package com.tirwanda.be.repository;

import com.tirwanda.be.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Asset findAssetByAssetNumber(String assetNumber);
}
