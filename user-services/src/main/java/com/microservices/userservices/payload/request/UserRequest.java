package com.microservices.userservices.payload.request;

import java.time.LocalDateTime;
import java.util.UUID;

import com.microservices.userservices.entity.Role;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserRequest {

    private Role role;

    private String name;

    private String userName;

    private String email;

    private String password;

    private String phone;

    private byte[] avarta;
    
    private String address;

    private LocalDateTime birthday;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID createdBy;

    private UUID updatedBy;

    private Integer status;
}
