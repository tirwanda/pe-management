package com.tirwanda.be.controller.user;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.request.RoleToUserDTO;
import com.tirwanda.be.dto.request.UserDTO;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.service.userservice.CreateUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SaveUserController {

    private final CreateUserServiceImpl createUserService;
    private final ModelMapper modelMapper;

    @PostMapping("/user/save")
    public ResponseEntity<ResponseData<User>> saveUser(@Valid @RequestBody UserDTO userDTO, Errors errors) {

        URI uri =URI.create(ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/user/save")
                .toUriString());

        ResponseData<User> responseData = new ResponseData<>();

        if (errors.hasErrors()) {
            for (ObjectError error : errors.getAllErrors()) {
                responseData.getMessage().add(error.getDefaultMessage());
            }
            responseData.setStatus(false);
            responseData.setPayload(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
        }

        User user = modelMapper.map(userDTO, User.class);
        responseData.setStatus(true);
        responseData.setPayload(createUserService.saveUser(user));
        return ResponseEntity.created(uri).body(responseData);
    }

    @PostMapping("/user/add-role")
    public ResponseEntity<ResponseData<String>> addRoleToUser(@Valid @RequestBody RoleToUserDTO roleToUserDTO, Errors errors) {
        ResponseData<String> responseData = new ResponseData<>();

        if (errors.hasErrors()) {
            for (ObjectError error : errors.getAllErrors()) {
                responseData.getMessage().add(error.getDefaultMessage());
            }
            responseData.setStatus(false);
            responseData.setPayload(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
        }

        createUserService.addRoleToUser(roleToUserDTO.getUsername(), roleToUserDTO.getRoleName());
        responseData.setStatus(true);
        responseData.setPayload("Success add role to user");

        return ResponseEntity.ok().body(responseData);
    }
}