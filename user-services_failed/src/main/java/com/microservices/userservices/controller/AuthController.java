package com.microservices.userservices.controller;

import com.microservices.userservices.entity.UserCredential;
import com.microservices.userservices.request.AuthRequest;
import com.microservices.userservices.request.LoginRequest;
import com.microservices.userservices.service.AuthService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-services/api/users")
public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public UserCredential addNewUser(@RequestBody AuthRequest authRequest) {
        return service.saveUser(authRequest);
    }

    @GetMapping("/get-by-id/{userId}")
    public UserCredential getUserById(@PathVariable UUID userId) {
        return service.getUserById(userId);
    }

    @PutMapping("/update/{userId}")
    public UserCredential updateUser(@PathVariable UUID userId, @RequestBody AuthRequest authRequest) {
        return service.updateUser(userId, authRequest);
    }

    @GetMapping("/get-all")
    public List<UserCredential> getAllUsers() {
        return service.getAllUsers();
    }

    @DeleteMapping("/delete/{userId}")
    public void deleteUserById(@PathVariable UUID userId) {
        service.deleteUserById(userId);
    }

    @PostMapping("/token")
    public String getToken(@RequestBody LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return service.generateToken(loginRequest.getUserName());
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam String token) {
        service.validateToken(token);
        return "Token is valid";
    }
}
