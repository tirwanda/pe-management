package com.tirwanda.be.service.itemCheck;

import com.tirwanda.be.dto.request.ItemCheckDTO;
import com.tirwanda.be.entity.ItemCheck;
import com.tirwanda.be.exception.ResourceNotFoundException;

public interface UpdateItemCheckService {
    ItemCheck updateItemCheck(ItemCheckDTO itemCheckDTO) throws ResourceNotFoundException;
}
