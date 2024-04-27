package com.microservices.userservices.controller;

import com.microservices.userservices.payload.request.AuthRequest;
import com.microservices.userservices.payload.request.UserRequest;
import com.microservices.userservices.payload.response.AuthenticationResponse;
import com.microservices.userservices.payload.response.UserResponse;
import com.microservices.userservices.payload.response.UserToOrthersResponse;
import com.microservices.userservices.service.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.nio.file.Path;

@RestController
@RequestMapping("user-services/api/users")
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {

    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/avatar/{filename:.+}")
    public ResponseEntity<Resource> getUserAvatar(@PathVariable String filename) {
        try {
            Path fileStorageLocation = Paths.get("src/main/resources/static/users").toAbsolutePath().normalize();
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) 
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(
            @RequestPart("userRequest") UserRequest userRequest,
            @RequestPart("avatar") MultipartFile imageFile) {
        UserResponse createdUser = userService.create(userRequest, imageFile);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable UUID id,
            @RequestPart("userRequest") UserRequest userRequest,
            @RequestPart(value = "avatar", required = false) MultipartFile newAvatar) {
        UserResponse updatedUser = userService.update(id, userRequest, newAvatar);
        return ResponseEntity.ok(updatedUser);
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

    @GetMapping("/get-customers")
    public ResponseEntity<List<UserResponse>> getCustomers() {
        List<UserResponse> users = userService.getCustomers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get-staffs")
    public ResponseEntity<List<UserResponse>> getStaffs() {
        List<UserResponse> users = userService.getStaffs();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserResponse> deleteUser(@PathVariable UUID id) {
        UserResponse deletedUser = userService.delete(id);
        return ResponseEntity.ok(deletedUser);
    }

    @GetMapping("/get-user-for-brand/{id}")
    public ResponseEntity<UserToOrthersResponse> getUserForBrand(@PathVariable UUID id) {
        UserToOrthersResponse userForBrand = userService.getUserForBrand(id);
        return ResponseEntity.ok(userForBrand);
    }

    @PostMapping("/token")
    public AuthenticationResponse getToken(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return userService.generateToken(authRequest.getUsername());
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        userService.validateToken(token);
        return "Token is valid";
    }

    @PutMapping("/switch-status/{id}")
    public ResponseEntity<Void> switchStatus(@PathVariable UUID id) {
        userService.switchStatus(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/trash/{id}")
    public ResponseEntity<Void> trash(@PathVariable UUID id) {
        userService.trash(id);
        return ResponseEntity.ok().build();
    }
}
