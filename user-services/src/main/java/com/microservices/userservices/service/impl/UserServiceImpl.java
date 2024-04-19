package com.microservices.userservices.service.impl;

import com.microservices.userservices.entity.User;
import com.microservices.userservices.exception.CustomException;
import com.microservices.userservices.payload.request.UserRequest;
import com.microservices.userservices.payload.response.UserResponse;
import com.microservices.userservices.payload.response.UserToBrandResponse;
import com.microservices.userservices.repository.UserRepository;
import com.microservices.userservices.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse create(UserRequest userRequest) {
        User user = new User();
        mapRequestToEntity(userRequest, user);
        user.setCreatedAt(LocalDateTime.now());

        // Hash password
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        User savedUser = userRepository.save(user);
        return mapEntityToResponse(savedUser);
    }

    @Override
    public UserResponse getById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found", "NOT_FOUND"));
        return mapEntityToResponse(user);
    }

    @Override
    public List<UserResponse> getAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse update(UUID id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found", "NOT_FOUND"));
        mapRequestToEntity(userRequest, user);
        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);
        return mapEntityToResponse(savedUser);
    }

    @Override
    public UserResponse delete(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found", "NOT_FOUND"));
        userRepository.delete(user);
        return mapEntityToResponse(user);
    }

    @Override
    public UserToBrandResponse getUserForBrand(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found", "NOT_FOUND"));
        return mapUserToBrandResponse(user);
    }


    private void mapRequestToEntity(UserRequest userRequest, User user) {
        BeanUtils.copyProperties(userRequest, user);
    }
    

    private UserResponse mapEntityToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);
        return userResponse;
    }

    private UserToBrandResponse mapUserToBrandResponse(User user) {
        UserToBrandResponse userToBrandResponse = new UserToBrandResponse();
        BeanUtils.copyProperties(user, userToBrandResponse);
        return userToBrandResponse;
    }
}
