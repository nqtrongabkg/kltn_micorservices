package com.microservices.userservices.service;

import com.microservices.userservices.config.exception.NotFoundException;
import com.microservices.userservices.entity.UserCredential;
import com.microservices.userservices.repository.UserCredentialRepository;
import com.microservices.userservices.request.AuthRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public UserCredential saveUser(AuthRequest authRequest) {
        UserCredential userCredential = new UserCredential();
        mapRequestToEntity(authRequest, userCredential);
        userCredential.setPassword(passwordEncoder.encode(userCredential.getPassword()));
        userCredential.setCreatedAt(LocalDateTime.now());
        repository.save(userCredential);
        return userCredential;
    }

    public UserCredential getUserById(UUID userId) {
        return repository.findById(userId)
                         .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
    }

    public UserCredential updateUser(UUID userId, AuthRequest authRequest) {
        // Kiểm tra xem người dùng có tồn tại không
        UserCredential existingUser = repository.findById(userId)
                                      .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        // Cập nhật thông tin người dùng từ AuthRequest
        mapRequestToEntity(authRequest, existingUser);
        // Cập nhật mật khẩu nếu có
        if (authRequest.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        }
        // Cập nhật thời gian cập nhật
        existingUser.setUpdatedAt(LocalDateTime.now());    
        // Lưu thay đổi vào cơ sở dữ liệu
        return repository.save(existingUser);
    }

    public List<UserCredential> getAllUsers() {
        return repository.findAll();
    }

    public void deleteUserById(UUID userId) {
        // Kiểm tra xem người dùng tồn tại không
        UserCredential existingUser = repository.findById(userId)
                                      .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        // Nếu người dùng tồn tại, xóa người dùng
        if(existingUser != null){
            repository.deleteById(userId);
        }
    }

    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

    private void mapRequestToEntity(AuthRequest authRequest, UserCredential userCredential) {
        BeanUtils.copyProperties(authRequest, userCredential);
    }
}
