package com.microservices.userservices.controller;

import com.microservices.userservices.payload.request.UserRequest;
import com.microservices.userservices.payload.response.UserResponse;
import com.microservices.userservices.payload.response.UserToBrandResponse;
import com.microservices.userservices.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("user-services/api/users")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        UserResponse createdUser = userService.create(userRequest);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id) {
        UserResponse user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest, @PathVariable UUID id) {
        UserResponse updatedUser = userService.update(id, userRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserResponse> deleteUser(@PathVariable UUID id) {
        UserResponse deletedUser = userService.delete(id);
        return ResponseEntity.ok(deletedUser);
    }

    @GetMapping("/get-user-for-brand/{id}")
    public ResponseEntity<UserToBrandResponse> getUserForBrand(@PathVariable UUID id) {
        UserToBrandResponse userForBrand = userService.getUserForBrand(id);
        return ResponseEntity.ok(userForBrand);
    }
}
