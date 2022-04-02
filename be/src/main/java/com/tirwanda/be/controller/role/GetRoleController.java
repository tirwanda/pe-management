package com.tirwanda.be.controller.role;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.entity.Role;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.service.role.PrintRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class GetRoleController {

    private final PrintRoleService printRoleService;

    @GetMapping("/roles")
    public ResponseEntity<ResponseData<List<Role>>> getRoles() {
        ResponseData<List<Role>> responseData = new ResponseData<>();
        responseData.setPayload(printRoleService.getRoles());
        responseData.setStatus(true);
        return ResponseEntity.ok().body(responseData);
    }

    @GetMapping(value = "/role/{roleId}")
    public ResponseEntity<ResponseData<Role>> getRole(@PathVariable Long roleId) throws ResourceNotFoundException {
        ResponseData<Role> responseData = new ResponseData<>();
        responseData.setPayload(printRoleService.getRole(roleId));
        responseData.setStatus(true);
        return ResponseEntity.ok().body(responseData);
    }
}
