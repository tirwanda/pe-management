package com.tirwanda.be.controller.user;

import com.tirwanda.be.dto.ResponseData;
import com.tirwanda.be.dto.UserDTO;
import com.tirwanda.be.entity.User;
import com.tirwanda.be.service.userservice.PrintUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class GetUserController {

    private final PrintUserServiceImpl printUserService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(printUserService.getUsers());
    }
}
