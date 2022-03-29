package com.tirwanda.be.controller.user;

import com.tirwanda.be.dto.ProfileDTO;
import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.UserDTO;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.userservice.UpdateUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UpdateUserController {

    private final UpdateUserServiceImpl updateUserService;
    private final ModelMapper modelMapper;

    @PutMapping("/user/update")
    public ResponseEntity<ResponseData<User>> updateUser(@Valid @RequestBody ProfileDTO profileDTO, Errors errors) {
        ResponseData<User> responseData = new ResponseData<>();

        try {
//            User user = modelMapper.map(userDTO, User.class);
            if (errors.hasErrors()) {
                for (ObjectError error : errors.getAllErrors()) {
                    responseData.getMessage().add(error.getDefaultMessage());
                }
                responseData.setStatus(false);
                responseData.setPayload(null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
            }
            responseData.setStatus(true);
            responseData.setPayload(updateUserService.updateUser(profileDTO));
            return ResponseEntity.ok().body(responseData);
        } catch (ResourceNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}
