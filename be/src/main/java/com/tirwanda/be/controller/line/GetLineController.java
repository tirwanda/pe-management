package com.tirwanda.be.controller.line;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.lineservice.PrintLineServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GetLineController {
    private final PrintLineServiceImpl printLineService;

    @GetMapping("/line/{lineCode}")
    public ResponseEntity<ResponseData<Line>> getLine(@PathVariable String lineCode) throws ResourceNotFoundException {
        ResponseData<Line> responseData = new ResponseData<>();
        Line line = printLineService.getLine(lineCode);

        if (line == null) {
            throw new ResourceNotFoundException("Line Code : '" + lineCode + "' not found");
        }

        responseData.setStatus(true);
        responseData.setPayload(line);
        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/lines")
    public ResponseEntity<ResponseData<List<Line>>> getLines() {
        ResponseData<List<Line>> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printLineService.getLines());

        return ResponseEntity.ok().body(responseData);
    }
}
