package com.tirwanda.be.controller.line;

import com.tirwanda.be.dto.request.LineDTO;
import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.SaveLineAddToUserDTO;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.service.line.CreateLineServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SaveLineController {

    private final CreateLineServiceImpl createLineService;
    private final ModelMapper modelMapper;

    @PostMapping("/line/save")
    public ResponseEntity<ResponseData<Line>> saveLine(@Valid @RequestBody LineDTO lineDTO, Errors errors) {
        ResponseData<Line> responseData = new ResponseData<>();
        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            Line line = modelMapper.map(lineDTO, Line.class);
            responseData.setStatus(true);
            responseData.setPayload(createLineService.saveLine(line));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException err) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, err.getMessage());
        }
    }

    @PostMapping("/line/save-and-add-to-user")
    public ResponseEntity<ResponseData<User>> saveLineAndAddToUser(@Valid @RequestBody SaveLineAddToUserDTO data, Errors errors) {
        ResponseData<User> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            Line line = modelMapper.map(data, Line.class);
            String username = data.getUsername();
            responseData.setStatus(true);
            responseData.setPayload(createLineService.createLineAndSaveToUser(line, username));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException err) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, err.getMessage());
        }
    }
}
