package com.tirwanda.be.controller.part;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.AddPartToAssetDTO;
import com.tirwanda.be.dto.request.PartDTO;
import com.tirwanda.be.entity.Part;
import com.tirwanda.be.exception.ResourceExistsException;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.part.CreatePartServiceImpl;
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
public class SavePartController {

    private final CreatePartServiceImpl createPartService;
    private final ModelMapper modelMapper;

    @PostMapping("/part/save")
    public ResponseEntity<ResponseData<Part>> savePart(@Valid @RequestBody PartDTO partDTO, Errors errors) {
        ResponseData<Part> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            Part part = modelMapper.map(partDTO, Part.class);
            responseData.setStatus(true);
            responseData.setPayload(createPartService.savePart(part));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PostMapping("/part/create-and-save-to-asset")
    public ResponseEntity<ResponseData<Part>> savePartAndAddToAsset(@Valid @RequestBody PartDTO partDTO,
                                                                    Errors errors) {
        ResponseData<Part> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            Part part = modelMapper.map(partDTO, Part.class);
            responseData.setStatus(true);
            responseData.setPayload(createPartService.savePartAndSaveToAsset(part, partDTO.getAssetNumber()));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceExistsException | ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @PostMapping("/part/add-part-to-asset")
    public ResponseEntity<ResponseData<Part>> addPartToAsset(@Valid @RequestBody AddPartToAssetDTO request, Errors errors) {
        ResponseData<Part> responseData = new ResponseData<>();

        try {
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            responseData.setStatus(true);
            responseData.setPayload(createPartService.addPartToAsset(request.getPartNumber(), request.getAssetNumber()));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
