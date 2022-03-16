package com.tirwanda.be.controller.division;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Division;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.division.PrintDivisionServiceImpl;
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
public class GetDivisionController {

    private final PrintDivisionServiceImpl printDivisionService;

    @GetMapping("/division/{divisionId}")
    public ResponseEntity<ResponseData<Division>> getDivision(@PathVariable Long divisionId)
            throws ResourceNotFoundException {

        ResponseData<Division> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printDivisionService.getDivision(divisionId));

        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping("/divisions")
    public ResponseEntity<ResponseData<List<Division>>> getDivisions() {
        ResponseData<List<Division>> responseData = new ResponseData<>();
        responseData.setStatus(true);
        responseData.setPayload(printDivisionService.getDivisions());

        return ResponseEntity.ok().body(responseData);
    }
}
