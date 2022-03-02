package com.tirwanda.be.controller.role;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.RoleDTO;
import com.tirwanda.be.entity.Role;
import com.tirwanda.be.service.roleservice.CreateRoleService;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SaveRoleController {

    private final CreateRoleService createRoleService;
    private final ModelMapper modelMapper;

    @PostMapping("/role/save")
    public ResponseEntity<ResponseData<Role>> saveRole(@Valid @RequestBody RoleDTO roleDTO, Errors errors) {

        URI uri =URI.create(ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/role/save")
                .toUriString());

        ResponseData<Role> responseData = new ResponseData<>();

        if (errors.hasErrors()) {
            for (ObjectError error : errors.getAllErrors()) {
                responseData.getMessage().add(error.getDefaultMessage());
            }
            responseData.setStatus(false);
            responseData.setPayload(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
        }

        Role role = modelMapper.map(roleDTO, Role.class);
        responseData.setStatus(true);
        responseData.setPayload(createRoleService.saveRole(role));
        return ResponseEntity.created(uri).body(responseData);
    }
}
