package com.tirwanda.be.service.line;

import com.tirwanda.be.dto.projection.CustomLineDetail;
import com.tirwanda.be.entity.Line;

import java.util.List;

public interface PrintLineService {
    Line getLine(String lineCode);
    List<Line> getLines();
    List<CustomLineDetail> getCustomLineDetail();
}
