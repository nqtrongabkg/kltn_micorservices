package com.microservices.userservices.service;

import java.util.List;
import java.util.UUID;

import com.microservices.userservices.payload.request.UserRequest;
import com.microservices.userservices.payload.response.AuthenticationResponse;
import com.microservices.userservices.payload.response.UserResponse;
import com.microservices.userservices.payload.response.UserToOrthersResponse;

public interface UserService {

    UserResponse create(UserRequest userRequest);

    UserResponse getById(UUID id);

    UserResponse getByUsername(String userName);

    List<UserResponse> getAll();
    
    UserResponse update(UUID id, UserRequest roleRequest);

    UserResponse delete(UUID id);

    UserToOrthersResponse getUserForBrand(UUID id);

    AuthenticationResponse generateToken(String username);

    void validateToken(String token);
}
