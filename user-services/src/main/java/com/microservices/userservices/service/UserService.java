package com.microservices.userservices.service;

import java.util.List;
import java.util.UUID;

import com.microservices.userservices.payload.request.UserRequest;
import com.microservices.userservices.payload.response.UserResponse;
import com.microservices.userservices.payload.response.UserToBrandResponse;

public interface UserService {

    UserResponse create(UserRequest userRequest);

    UserResponse getById(UUID id);

    List<UserResponse> getAll();
    
    UserResponse update(UUID id, UserRequest roleRequest);

    UserResponse delete(UUID id);

    UserToBrandResponse getUserForBrand(UUID id);

    String generateToken(String username);

    void validateToken(String token);
}
