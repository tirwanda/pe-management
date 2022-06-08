package com.tirwanda.be.service.itemCheck;

import com.tirwanda.be.entity.ItemCheck;
import com.tirwanda.be.repository.ItemCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CreateItemCheckServiceImpl implements CreateItemCheckService {

    private final ItemCheckRepository itemCheckRepository;

    @Override
    public ItemCheck saveItemCheck(ItemCheck itemCheck) {
        return itemCheckRepository.save(itemCheck);
    }
}
