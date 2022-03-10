package com.tirwanda.be.service.lineservice;

import com.tirwanda.be.entity.Line;

import java.util.List;

public interface PrintLineService {
    Line getLine(String lineCode);
    List<Line> getLines();
}
