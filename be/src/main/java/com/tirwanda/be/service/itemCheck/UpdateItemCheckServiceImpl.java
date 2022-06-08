package com.tirwanda.be.service.itemCheck;

import com.tirwanda.be.dto.request.ItemCheckDTO;
import com.tirwanda.be.entity.ItemCheck;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.ItemCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UpdateItemCheckServiceImpl implements UpdateItemCheckService {

    private final ItemCheckRepository itemCheckRepository;

    @Override
    public ItemCheck updateItemCheck(ItemCheckDTO itemCheckDTO) throws ResourceNotFoundException {
        ItemCheck itemCheck = itemCheckRepository.findById(itemCheckDTO.getItemCheckId())
                .orElseThrow(() -> new ResourceNotFoundException("Item check doesn't exist"));

        itemCheck.setItemCheck(itemCheckDTO.getItemCheck());
        itemCheck.setStatus(itemCheckDTO.getStatus());
        return itemCheckRepository.save(itemCheck);
    }
}
