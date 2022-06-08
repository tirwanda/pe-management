package com.tirwanda.be.service.itemCheck;

import com.tirwanda.be.repository.ItemCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DeleteItemCheckServiceImpl implements DeleteItemCheckService{

    private final ItemCheckRepository itemCheckRepository;

    @Override
    public void DeleteItemCheck(Long itemCheckId) {
        itemCheckRepository.deleteById(itemCheckId);
    }
}
